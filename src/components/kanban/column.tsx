"use client";

import TaskCard, { KanbanTask } from "./task-card";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

export default function Column({
  id,
  title,
  tasks,
  onAddTask,
  onTaskClick,
}: {
  id: string; // status id: "todo" | "in_progress" | "done"
  title: string;
  tasks: KanbanTask[];
  onAddTask: () => void;
  onTaskClick?: (task: KanbanTask) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="flex h-full w-full min-w-[320px] flex-col rounded-lg border bg-muted/20 p-3">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</div>
        <button
          type="button"
          onClick={onAddTask}
          className="rounded-md border px-2 py-1 text-xs hover:bg-background"
        >
          + Task
        </button>
      </div>
      <div
        ref={setNodeRef}
        className={`flex-1 space-y-2 overflow-y-auto rounded-md p-1 ${isOver ? "bg-primary/5" : ""}`}
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((t) => (
            <TaskCard key={t.id} task={t} onClick={() => onTaskClick?.(t)} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
