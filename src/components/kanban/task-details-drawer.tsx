"use client";

import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Check, X, Send, Eye, EyeOff, Wand2, Copy } from "lucide-react";
import { KanbanTask, KanbanUser } from "./task-card";

const PRIORITIES = ["low", "medium", "high", "urgent"] as const;
const STATUSES = [
  { id: "todo", label: "Todo" },
  { id: "in_progress", label: "In Progress" },
  { id: "done", label: "Done" },
] as const;

export default function TaskDetailsDrawer({
  open,
  onOpenChange,
  task,
  onTaskUpdated,
  members,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  task: KanbanTask | null;
  onTaskUpdated: (updated: Partial<KanbanTask>) => void;
  members: KanbanUser[];
}) {
  const [local, setLocal] = useState<KanbanTask | null>(null);
  const [descMode, setDescMode] = useState<"edit" | "preview">("edit");
  const [saving, setSaving] = useState(false);

  // Comments state
  type Comment = { id: string; content: string; createdAt: string; author: KanbanUser };
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [busyCommentId, setBusyCommentId] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Labels as comma-separated name:color (must be before any early return to keep hook order stable)
  const labelsText = useMemo(
    () => ((local?.labels || []).map((l) => `${l.name}:${l.color}`).join(", ") || ""),
    [local?.labels]
  );

  useEffect(() => {
    if (open && task) {
      setLocal({ ...task });
      // fetch comments
      fetch(`/api/tasks/${task.id}/comments`, { cache: "no-store" })
        .then((r) => r.json())
        .then((data) => setComments(data.comments || []))
        .catch(() => setComments([]));
    } else {
      setLocal(null);
      setComments([]);
      setNewComment("");
    }
  }, [open, task?.id]);

  if (!open || !local) return null;

  async function patchTask(partial: Partial<KanbanTask>) {
    // Guard: TypeScript doesn't narrow `local` for nested functions, so ensure it's present
    if (!local) return;
    setSaving(true);
    try {
      const current = local;
      const body: any = {
        title: partial.title ?? current.title,
        description: typeof partial.description !== "undefined" ? partial.description : (current.description ?? ""),
        status: partial.status ?? current.status,
        priority: partial.priority ?? current.priority,
        dueDate: typeof partial.dueDate !== "undefined" ? partial.dueDate : current.dueDate,
        assigneeId: typeof (partial as any).assigneeId !== "undefined" ? (partial as any).assigneeId : (current.assignee?.id || null),
        labels: (partial as any).labels || current.labels || [],
      };
      const res = await fetch(`/api/tasks/${current.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to save");
      onTaskUpdated(partial);
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to save task changes");
    } finally {
      setSaving(false);
    }
  }

  async function addComment() {
    const content = newComment.trim();
    if (!content) return;
    if (!local) return; // Guard for TS: local can be null in nested functions
    setBusyCommentId("new");
    try {
      const res = await fetch(`/api/tasks/${local.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setComments((c) => [...c, data.comment]);
      setNewComment("");
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to add comment");
    } finally {
      setBusyCommentId(null);
    }
  }

  async function updateComment(id: string, content: string) {
    setBusyCommentId(id);
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setComments((cs) => cs.map((c) => (c.id === id ? data.comment : c)));
      setEditingCommentId(null);
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to update comment");
    } finally {
      setBusyCommentId(null);
    }
  }

  async function deleteComment(id: string) {
    setBusyCommentId(id);
    try {
      const res = await fetch(`/api/comments/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setComments((cs) => cs.filter((c) => c.id !== id));
      setConfirmDeleteId(null);
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to delete comment");
    } finally {
      setBusyCommentId(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-3xl flex-col bg-background shadow-xl">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 flex items-center gap-3 border-b bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/75">
          <input
            value={local.title}
            onChange={(e) => setLocal({ ...local, title: e.target.value })}
            onBlur={() => patchTask({ title: local.title })}
            className="w-full rounded-md border bg-transparent px-3 py-2 text-lg font-semibold outline-none focus:ring-2 focus:ring-primary"
            placeholder="Task title"
          />
          {/* Task ID and copy */}
          <div className="flex items-center gap-2">
            <span
              className="hidden md:inline-block rounded-md border px-2 py-1 text-[11px] font-mono text-muted-foreground"
              title="Task ID"
            >
              {local.id}
            </span>
            <button
              className="rounded-md border p-2"
              onClick={() => navigator.clipboard?.writeText(String(local.id))}
              aria-label="Copy Task ID"
              title="Copy Task ID"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <button
            className="rounded-md border p-2"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="grid h-full grid-cols-1 gap-6 overflow-y-auto p-5 md:grid-cols-12">
          {/* Left column */}
          <div className="md:col-span-7 space-y-5">
            {/* Description */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Description</h3>
                <button
                  className="rounded-md border p-1 text-xs"
                  onClick={() => setDescMode(descMode === "edit" ? "preview" : "edit")}
                  aria-label={descMode === "edit" ? "Preview" : "Edit"}
                  title={descMode === "edit" ? "Preview" : "Edit"}
                >
                  {descMode === "edit" ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
              {descMode === "edit" ? (
                <textarea
                  className="min-h-[160px] w-full rounded-md border bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                  value={(local.description as any) || ""}
                  onChange={(e) => setLocal({ ...local, description: e.target.value })}
                  onBlur={() => patchTask({ description: local.description || "" })}
                  placeholder="Write description in Markdown..."
                />
              ) : (
                <div className="prose prose-sm dark:prose-invert max-w-none rounded-md border p-3">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{(local.description as any) || ""}</ReactMarkdown>
                </div>
              )}
            </section>

            {/* Meta fields */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="block text-sm font-medium">Priority</label>
                <select
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  value={local.priority}
                  onChange={(e) => { const v = e.target.value as any; setLocal({ ...local, priority: v }); patchTask({ priority: v }); }}
                >
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>{p[0].toUpperCase() + p.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium">Status</label>
                <select
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  value={local.status}
                  onChange={(e) => { const v = e.target.value; setLocal({ ...local, status: v }); patchTask({ status: v }); }}
                >
                  {STATUSES.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium">Assignee</label>
                <select
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  value={local.assignee?.id || ""}
                  onChange={(e) => { const id = e.target.value || null; setLocal({ ...local, assignee: members.find((m) => m.id === id) || null }); patchTask({ assigneeId: id } as any); }}
                >
                  <option value="">Unassigned</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>{m.name || m.email || m.id}</option>
                  ))}
                </select>
                {local.aiSuggestedAssignee ? (
                  <div className="mt-2 rounded-md border bg-muted/30 p-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Wand2 className="h-3.5 w-3.5 text-primary" />
                        <span>AI Suggested</span>
                      </div>
                      <div className="font-medium">
                        @{local.aiSuggestedAssignee.name || local.aiSuggestedAssignee.email || local.aiSuggestedAssignee.id}
                      </div>
                    </div>
                    <div className="mt-2">
                      <Button
                        size="sm"
                        onClick={() => { const id = local.aiSuggestedAssignee?.id || null; if (id) { setLocal({ ...local, assignee: members.find((m) => m.id === id) || null }); patchTask({ assigneeId: id } as any); } }}
                      >
                        Accept Suggestion
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium">Due date</label>
                <input
                  type="date"
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  value={local.dueDate ? new Date(local.dueDate as any).toISOString().slice(0, 10) : ""}
                  onChange={(e) => { const v = e.target.value || null; setLocal({ ...local, dueDate: v }); patchTask({ dueDate: v }); }}
                />
              </div>
            </section>

            {/* Labels */}
            <section className="space-y-2">
              <label className="block text-sm font-medium">Labels</label>
              <input
                className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                value={labelsText}
                onChange={(e) => {
                  const input = e.target.value;
                  const labels = input
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((pair) => {
                      const [name, color] = pair.split(":").map((x) => x.trim());
                      if (!name) return null as any;
                      return { name, color: color || "#666" };
                    })
                    .filter(Boolean) as { name: string; color: string }[];
                  setLocal({ ...local, labels });
                  patchTask({ labels } as any);
                }}
                placeholder="bug:#e11d48, backend:#2563eb"
              />
              {/* Labels preview chips */}
              {local.labels?.length ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {local.labels.map((l) => (
                    <span key={l.name} className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs" style={{ borderColor: l.color, color: l.color }}>
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.color }} />
                      {l.name}
                    </span>
                  ))}
                </div>
              ) : null}
            </section>
          </div>

          {/* Right column */}
          <div className="md:col-span-5 flex min-h-0 flex-col">
            <h3 className="mb-2 text-sm font-semibold">Comments</h3>
            <div className="flex-1 space-y-3 overflow-y-auto rounded-md pr-1">
              {comments.map((c) => {
                const isEditing = editingCommentId === c.id;
                const isConfirming = confirmDeleteId === c.id;
                return (
                  <div key={c.id} className="rounded-md border p-2 overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2 min-w-0">
                        <span>{c.author.name || c.author.email || c.author.id}</span>
                        <span>•</span>
                        <span>{new Date(c.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {!isEditing && !isConfirming && (
                          <>
                            <button
                              disabled={busyCommentId === c.id}
                              className="rounded-md border p-1 hover:bg-muted"
                              onClick={() => { setEditingCommentId(c.id); setEditingContent(c.content); }}
                              aria-label="Edit comment"
                              title="Edit comment"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              disabled={busyCommentId === c.id}
                              className="rounded-md border p-1 hover:bg-muted text-destructive"
                              onClick={() => setConfirmDeleteId(c.id)}
                              aria-label="Delete comment"
                              title="Delete comment"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                        {isEditing && (
                          <>
                            <button
                              disabled={busyCommentId === c.id || !editingContent.trim()}
                              className="rounded-md border p-1 hover:bg-muted"
                              onClick={() => updateComment(c.id, editingContent)}
                              aria-label="Save"
                              title="Save"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                            <button
                              disabled={busyCommentId === c.id}
                              className="rounded-md border p-1 hover:bg-muted"
                              onClick={() => { setEditingCommentId(null); setEditingContent(""); }}
                              aria-label="Cancel"
                              title="Cancel"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                        {isConfirming && (
                          <>
                            <span className="text-[11px] whitespace-nowrap">Confirm?</span>
                            <button
                              disabled={busyCommentId === c.id}
                              className="rounded-md border p-1 hover:bg-muted text-destructive"
                              onClick={() => deleteComment(c.id)}
                              aria-label="Confirm delete"
                              title="Confirm delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              disabled={busyCommentId === c.id}
                              className="rounded-md border p-1 hover:bg-muted"
                              onClick={() => setConfirmDeleteId(null)}
                              aria-label="Cancel"
                              title="Cancel"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="mt-1 whitespace-pre-wrap break-words text-sm">
                      {isEditing ? (
                        <textarea
                          className="min-h-[80px] w-full rounded-md border bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                        />
                      ) : (
                        c.content
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="sticky bottom-0 mt-3 flex items-start gap-2 border-t bg-background p-2">
              <textarea
                className="h-20 flex-1 rounded-md border bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
              />
              <Button onClick={addComment} disabled={!newComment.trim() || busyCommentId === "new"} aria-label="Post comment" title="Post comment">
                <Send className="h-4 w-4" />
                <span className="sr-only">Post</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Non-blocking banners */}
        {saving ? (
          <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-background/80 px-2 py-1 text-xs shadow">Saving...</div>
        ) : null}
        {errorMsg ? (
          <div className="absolute bottom-3 left-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive shadow">
            {errorMsg}
          </div>
        ) : null}
      </div>
    </div>
  );
}
