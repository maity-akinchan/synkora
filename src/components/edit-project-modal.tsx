"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  initialName: string;
  initialDescription?: string;
  onUpdated?: () => void;
};

export default function EditProjectModal({ open, onOpenChange, projectId, initialName, initialDescription = "", onUpdated }: Props) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [memberEmails, setMemberEmails] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setName(initialName);
      setDescription(initialDescription);
      setMemberEmails("");
    }
  }, [open, initialName, initialDescription]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          memberEmails: memberEmails
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error("Failed to update project");
      onOpenChange(false);
      onUpdated?.();
    } catch (err) {
      console.error(err);
      alert("Failed to update project");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="absolute inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div
        className="relative z-10 w-full max-w-lg rounded-lg border bg-background p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold">Edit Project</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Add Members (emails, comma-separated)</label>
            <input
              className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
              value={memberEmails}
              onChange={(e) => setMemberEmails(e.target.value)}
              placeholder="alice@example.com, bob@example.com"
            />
            <p className="mt-1 text-xs text-muted-foreground">Existing members will be kept; listed emails will be added if users exist.</p>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
