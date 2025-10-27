"use client";

import { CSSProperties, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export type KanbanLabel = { id?: string; name: string; color: string };
export type KanbanUser = { id: string; name: string | null; email: string | null; image: string | null };
export type KanbanTask = {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  priority?: string | null;
  dueDate?: string | Date | null;
  assignee?: KanbanUser | null;
  labels?: KanbanLabel[];
  sortOrder?: number;
  createdAt?: string | Date;
  aiSuggestedAssignee?: KanbanUser | null;
  allocationConfidence?: number | null;
};

function formatDate(d?: string | Date | null) {
  if (!d) return null;
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function initials(name?: string | null, email?: string | null) {
  if (name) {
    const parts = name.trim().split(" ");
    const i = parts[0]?.[0] || "";
    const j = parts[1]?.[0] || "";
    return (i + j).toUpperCase() || (email?.[0] || "?").toUpperCase();
  }
  return (email?.[0] || "?").toUpperCase();
}

// ✅ Safe priorityColor
function priorityColor(priority?: string | null) {
  const p = (priority || "").toLowerCase();
  switch (p) {
    case "urgent":
      return "bg-red-600/15 text-red-600 border-red-600/20";
    case "high":
      return "bg-orange-500/15 text-orange-600 border-orange-500/20";
    case "medium":
      return "bg-amber-500/15 text-amber-600 border-amber-500/20";
    case "low":
      return "bg-emerald-500/15 text-emerald-600 border-emerald-500/20";
    default:
      return "bg-gray-300/20 text-gray-600 border-gray-300/30"; // fallback
  }
}

export default function TaskCard({ task, onClick }: { task: KanbanTask; onClick?: () => void }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    cursor: "grab",
  };

  const due = useMemo(() => formatDate(task.dueDate), [task.dueDate]);
  const displayPriority =
    task.priority && typeof task.priority === "string"
      ? task.priority[0].toUpperCase() + task.priority.slice(1).toLowerCase()
      : "None";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={onClick}
      className="group relative rounded-md border bg-card p-3 shadow-sm hover:shadow cursor-pointer"
    >
      {/* Subtle drag handle */}
      <button
        ref={setActivatorNodeRef as any}
        {...listeners}
        type="button"
        className="absolute right-2 top-2 hidden h-5 w-5 items-center justify-center rounded hover:bg-muted/70 group-hover:flex"
        title="Drag"
        aria-label="Drag"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>

      <div className="grid grid-cols-[1fr_auto] gap-x-2 pr-6">
        <div>
          <div className="font-medium leading-tight line-clamp-2">
            {task.title || "Untitled Task"}
          </div>
        </div>

        <div className="row-span-2 flex flex-col items-end gap-1">
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${priorityColor(
              task.priority
            )}`}
          >
            {displayPriority}
          </span>
          {task.assignee ? (
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={task.assignee.image || undefined}
                alt={task.assignee.name || task.assignee.email || "Assignee"}
              />
              <AvatarFallback>{initials(task.assignee.name, task.assignee.email)}</AvatarFallback>
            </Avatar>
          ) : null}
        </div>

        <div className="mt-2 flex items-center gap-2">
          {due ? <div className="text-xs text-muted-foreground">Due {due}</div> : null}
        </div>
      </div>

      {task.labels?.length ? (
        <div className="mt-2 flex flex-wrap gap-1">
          {task.labels.map((l) => (
            <span
              key={l.id || l.name}
              className="rounded-md border px-1.5 py-0.5 text-[10px]"
              style={{ borderColor: l.color, color: l.color }}
            >
              {l.name}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
