"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Wand2 } from "lucide-react";
import { KanbanTask, KanbanUser } from "./task-card";

const PRIORITIES = ["low", "medium", "high", "urgent"] as const;

export default function TaskModal({
  open,
  onOpenChange,
  projectId,
  members,
  editing,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  projectId: string;
  members: KanbanUser[];
  editing: KanbanTask | null;
  onSaved: () => void | Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState<string | "">("");
  const [priority, setPriority] = useState<(typeof PRIORITIES)[number]>("medium");
  const [dueDate, setDueDate] = useState<string>("");
  const [labelsText, setLabelsText] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{ userId: string; confidence: number } | null>(null);
  const [aiError, setAiError] = useState<string>("");

  useEffect(() => {
    if (open) {
      if (editing && editing.id) {
        setTitle(editing.title || "");
        setDescription((editing.description as any) || "");
        setAssigneeId(editing.assignee?.id || "");
        setPriority((editing.priority?.toLowerCase() as any) || "medium");
        setDueDate(
          editing.dueDate
            ? new Date(editing.dueDate as any).toISOString().slice(0, 10)
            : ""
        );
        setLabelsText((editing.labels || []).map((l) => `${l.name}:${l.color}`).join(", "));
      } else if (editing) {
        // Creating in a given status
        setTitle("");
        setDescription("");
        setAssigneeId("");
        setPriority("medium");
        setDueDate("");
        setLabelsText("");
      }
    } else {
      setTitle("");
      setDescription("");
      setAssigneeId("");
      setPriority("medium");
      setDueDate("");
      setLabelsText("");
    }
  }, [open, editing]);

  async function fetchAISuggestion() {
    if (!editing) return;
    // Client-side friendly validation before calling the API
    if (!title.trim()) {
      setAiError("Please enter a task title to get an AI suggestion.");
      return;
    }
    if (!priority) {
      setAiError("Please select a priority to get an AI suggestion.");
      return;
    }
    if (!projectId) {
      setAiError("We couldn't detect the project. Please close and reopen the modal.");
      return;
    }
    setAiLoading(true);
    setAiError("");
    setAiSuggestion(null);
    try {
      const res = await fetch("/api/ai/allocateTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: {
            title: title.trim() || "",
            description: description || "",
            priority,
            labels: parseLabels(labelsText).map((l) => ({ name: l.name })),
            dueDate: dueDate || null,
            projectId,
          },
        }),
      });
      const data = await res.json();
      if (res.ok && data?.suggestion) {
        setAiSuggestion(data.suggestion);
      } else if (data?.disabled) {
        setAiError("AI allocation is disabled.");
      } else {
        setAiError(data?.error || "Failed to get AI suggestion");
      }
    } catch (e) {
      console.error(e);
      setAiError("Failed to get AI suggestion");
    } finally {
      setAiLoading(false);
    }
  }

  function applyAISuggestion() {
    if (!aiSuggestion) return;
    setAssigneeId(aiSuggestion.userId);
  }

  function parseLabels(input: string) {
    // format: name:color, name2:#RRGGBB
    return input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((pair) => {
        const [name, color] = pair.split(":").map((x) => x.trim());
        if (!name) return null as any;
        return { name, color: color || "#666" };
      })
      .filter(Boolean) as { name: string; color: string }[];
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !editing) return;
    setSubmitting(true);
    try {
      const payload = {
        projectId,
        title,
        description,
        status: editing.status,
        priority,
        dueDate: dueDate || null,
        assigneeId: assigneeId || null,
        labels: parseLabels(labelsText),
      };

      if (editing.id) {
        const res = await fetch(`/api/tasks/${editing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update task");
      } else {
        const res = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create task");
      }

      await onSaved();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to save task");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open || !editing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative z-10 w-full max-w-xl rounded-lg border bg-background p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{editing.id ? "Edit Task" : `New Task — ${labelForStatus(editing.status)}`}</h2>
          <button
            type="button"
            className="rounded-md border p-2"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Title</label>
            <input
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Task title"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="min-h-[120px] w-full rounded-md border bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="block text-sm font-medium">Assignee</label>
              <select
                className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
              >
                <option value="">Unassigned</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name || m.email || m.id}
                  </option>
                ))}
              </select>
              {/* AI Suggestion */}
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={fetchAISuggestion}
                    disabled={aiLoading}
                    aria-label="Get AI Suggestion"
                    title="Get AI Suggestion"
                  >
                    {aiLoading ? "Getting suggestion..." : "Get AI Suggestion"}
                  </Button>
                  {aiError ? <div className="text-xs text-destructive">{aiError}</div> : null}
                </div>
                {aiSuggestion ? (
                  <div className="rounded-md border bg-muted/30 p-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wand2 className="h-3.5 w-3.5 text-primary" />
                        <span className="text-muted-foreground">AI Suggestion</span>
                      </div>
                      <div className="font-medium">
                        @
                        {(members.find((m) => m.id === aiSuggestion.userId)?.name ||
                          members.find((m) => m.id === aiSuggestion.userId)?.email ||
                          aiSuggestion.userId) as string}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={applyAISuggestion}
                        aria-label="Apply AI suggestion"
                        title="Apply AI suggestion"
                      >
                        Apply Suggestion
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={fetchAISuggestion}
                        title="Refresh suggestion"
                      >
                        Refresh
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium">Priority</label>
              <select
                className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p[0].toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="block text-sm font-medium">Due date</label>
              <input
                type="date"
                className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium">Labels</label>
              <input
                className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                value={labelsText}
                onChange={(e) => setLabelsText(e.target.value)}
                placeholder="bug:#e11d48, backend:#2563eb"
              />
              {labelsText.trim() ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {parseLabels(labelsText).map((l) => (
                    <span key={l.name} className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs" style={{ borderColor: l.color, color: l.color }}>
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.color }} />
                      {l.name}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {errorMsg ? (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive">
                {errorMsg}
              </div>
            ) : <div />}
            <div className="flex gap-2">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={submitting} aria-label="Cancel" title="Cancel">
                <X className="mr-1 h-4 w-4" /> Cancel
              </Button>
              <Button type="submit" disabled={submitting} aria-label={editing.id ? "Save" : "Create"} title={editing.id ? "Save" : "Create"}>
                <Check className="mr-1 h-4 w-4" /> {submitting ? "Saving..." : editing.id ? "Save" : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function labelForStatus(status: string) {
  const s = status.toLowerCase();
  if (s === "in_progress") return "In Progress";
  if (s === "done") return "Done";
  return "Todo";
}
