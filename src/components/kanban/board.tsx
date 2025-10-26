"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import Column from "./column";
import TaskModal from "./task-modal";
import TaskDetailsDrawer from "./task-details-drawer";
import { KanbanTask, KanbanUser } from "./task-card";

export type KanbanBoardProps = {
  projectId: string;
  initialTasks: KanbanTask[];
  members: KanbanUser[];
};

const STATUS_INFO: { id: string; title: string }[] = [
  { id: "todo", title: "Todo" },
  { id: "in_progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export default function KanbanBoard({ projectId, initialTasks, members }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<KanbanTask[]>(() =>
    initialTasks.map((t) => ({ ...t, status: t.status.toLowerCase() }))
  );
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<KanbanTask | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<KanbanTask | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Refresh tasks after create/edit
  async function refresh() {
    try {
      const res = await fetch(`/api/tasks?projectId=${projectId}`, { cache: "no-store" });
      const data = await res.json();
      if (res.ok) {
        setTasks((data.tasks || []).map((t: KanbanTask) => ({ ...t, status: t.status.toLowerCase() })));
      }
    } catch (e) {
      console.error(e);
    }
  }

  // Derived lists
  const columns = useMemo(() => {
    const by = (status: string) =>
      tasks
        .filter((t) => (t.status || "todo").toLowerCase() === status)
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || new Date(a.createdAt as any).getTime() - new Date(b.createdAt as any).getTime());
    return {
      todo: by("todo"),
      in_progress: by("in_progress"),
      done: by("done"),
    } as Record<string, KanbanTask[]>;
  }, [tasks]);

  function handleAdd(status: string) {
    setEditing({
      id: "",
      title: "",
      description: "",
      status,
      priority: "medium",
      dueDate: null,
      assignee: null,
      labels: [],
    });
    setModalOpen(true);
  }

  function handleTaskClick(task: KanbanTask) {
    setSelected(task);
    setDrawerOpen(true);
  }

  function computeReorderWithin(list: KanbanTask[], activeId: string, overId: string) {
    const oldIndex = list.findIndex((t) => t.id === activeId);
    const newIndex = list.findIndex((t) => t.id === overId);
    const reordered = arrayMove(list, oldIndex, newIndex);
    return reordered.map((t, i) => ({ id: t.id, status: t.status, sortOrder: i + 1 }));
  }

  async function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    // Find active task
    const activeTask = tasks.find((t) => t.id === String(active.id));
    if (!activeTask) return;

    // Determine target column by droppable container id
    // We use column id in Column component for useDroppable, and task ids for sortable items
    const overTask = tasks.find((t) => t.id === String(over.id));

    // If dropped on a task, use that task's status for target column
    // If not found, the droppable container id should be in over.id for columns. But
    // @dnd-kit with SortableContext gives task ids; we already use Column's droppable id for background area
    // so over.id might be either a task id or a column id.

    const targetStatus = overTask ? overTask.status : String(over.id);

    // Build new state
    let next = [...tasks];
    const fromStatus = activeTask.status;

    // Move across columns if needed
    if (fromStatus !== targetStatus) {
      next = next.map((t) => (t.id === activeTask.id ? { ...t, status: targetStatus } : t));
    }

    // Recompute orders within both affected columns
    const fromList = next.filter((t) => t.status === fromStatus).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    const toList = targetStatus === fromStatus
      ? fromList
      : next.filter((t) => t.status === targetStatus).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

    // If dropping onto a column background, place at end
    let updates: { id: string; status: string; sortOrder: number }[] = [];

    if (!overTask) {
      // remove from source
      const srcWithout = fromList.filter((t) => t.id !== activeTask.id);
      // append to dest end
      const dest = targetStatus === fromStatus ? srcWithout : toList;
      const newOrder = [...dest, { ...activeTask, status: targetStatus }].map((t, i) => ({ id: t.id, status: t.status, sortOrder: i + 1 }));
      updates = newOrder;
      // apply to local state
      const updatedIds = new Set(newOrder.map((u) => u.id));
      next = next.map((t) => {
        const u = newOrder.find((x) => x.id === t.id);
        return u ? { ...t, status: u.status, sortOrder: u.sortOrder } : t;
      });
    } else {
      // Reorder inside target list including the active task at new index
      const list = targetStatus === fromStatus ? fromList : [...toList, { ...activeTask, status: targetStatus }];
      updates = computeReorderWithin(list, String(active.id), String(over.id));
      next = next.map((t) => {
        const u = updates.find((x) => x.id === t.id);
        return u ? { ...t, status: u.status, sortOrder: u.sortOrder } : t;
      });
    }

    setTasks(next);
    setLoading(true);
    try {
      await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, updates }),
      });
    } catch (e) {
      console.error(e);
      // fallback: refresh from server
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Column id="todo" title="Todo" tasks={columns.todo} onAddTask={() => handleAdd("todo")} onTaskClick={handleTaskClick} />
          <Column id="in_progress" title="In Progress" tasks={columns.in_progress} onAddTask={() => handleAdd("in_progress")} onTaskClick={handleTaskClick} />
          <Column id="done" title="Done" tasks={columns.done} onAddTask={() => handleAdd("done")} onTaskClick={handleTaskClick} />
        </div>
      </DndContext>

      <TaskModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        projectId={projectId}
        members={members}
        editing={editing}
        onSaved={async () => {
          setModalOpen(false);
          setEditing(null);
          await refresh();
        }}
      />

      <TaskDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        task={selected}
        members={members}
        onTaskUpdated={(partial) => {
          if (!selected) return;
          const id = selected.id;
          setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...partial } : t)));
          // also update selected for immediate UI feedback
          setSelected((s) => (s ? { ...s, ...partial } as KanbanTask : s));
        }}
      />

      {loading ? (
        <div className="pointer-events-none fixed inset-0 flex items-start justify-center p-4">
          <div className="rounded-md bg-background/80 px-3 py-1 text-xs shadow">Saving...</div>
        </div>
      ) : null}
    </div>
  );
}
