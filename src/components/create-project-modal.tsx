"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  onCreated?: () => void;
};

export default function CreateProjectModal({ onCreated }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [memberEmails, setMemberEmails] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
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
      if (!res.ok) throw new Error("Failed to create project");
      setOpen(false);
      setName("");
      setDescription("");
      setMemberEmails("");
      if (onCreated) onCreated();
      else router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg"
        onClick={() => setOpen(true)}
        aria-label="Create project"
      >
        +
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-lg border bg-background p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Create Project</h2>
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
                <label className="block text-sm font-medium">Members (emails, comma-separated)</label>
                <input
                  className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                  value={memberEmails}
                  onChange={(e) => setMemberEmails(e.target.value)}
                  placeholder="alice@example.com, bob@example.com"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={submitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
