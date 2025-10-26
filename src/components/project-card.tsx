"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import EditProjectModal from "./edit-project-modal";

export type ProjectMember = {
  user: { id: string; name: string | null; email: string | null; image: string | null };
  role: string;
};

export type ProjectCardProps = {
  project: {
    id: string;
    name: string;
    description: string | null;
    createdAt: string | Date;
    members: ProjectMember[];
  };
  canAdmin?: boolean; // whether current user is admin on this project
};

export function ProjectCard({ project, canAdmin }: ProjectCardProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const created = new Date(project.createdAt);
  // Use deterministic formatting (fixed locale + UTC) to avoid hydration mismatch
  const createdStr = new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(created);

  function initials(name?: string | null, email?: string | null) {
    if (name) {
      const parts = name.trim().split(" ");
      const i = parts[0]?.[0] || "";
      const j = parts[1]?.[0] || "";
      return (i + j).toUpperCase() || (email?.[0] || "?").toUpperCase();
    }
    return (email?.[0] || "?").toUpperCase();
  }

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    if (!canAdmin) return;
    if (!confirm(`Delete project "${project.name}"? This cannot be undone.`)) return;
    try {
      setBusy(true);
      const res = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project.");
    } finally {
      setBusy(false);
    }
  }

  function handleEdit(e: React.MouseEvent) {
    e.stopPropagation();
    if (!canAdmin) return;
    setEditOpen(true);
  }

  return (
    <div
      onClick={() => router.push(`/project/${project.id}`)}
      className="group relative rounded-lg border bg-card p-5 shadow-sm transition hover:shadow-md cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold leading-tight">{project.name}</h3>
          {project.description ? (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
          ) : null}
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Project actions">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleEdit} disabled={!canAdmin}>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={handleDelete} disabled={!canAdmin || busy}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex -space-x-2">
          {project.members.slice(0, 5).map((m) => (
            <Avatar key={m.user.id} className="h-8 w-8 ring-2 ring-background">
              <AvatarImage src={m.user.image || undefined} alt={m.user.name || m.user.email || "Member"} />
              <AvatarFallback>{initials(m.user.name, m.user.email)}</AvatarFallback>
            </Avatar>
          ))}
          {project.members.length > 5 ? (
            <div className="ml-2 text-xs text-muted-foreground">+{project.members.length - 5} more</div>
          ) : null}
        </div>
        <div className="ml-auto text-xs text-muted-foreground">Created {createdStr}</div>
      </div>
      {canAdmin ? (
        <EditProjectModal
          open={editOpen}
          onOpenChange={(v: boolean) => setEditOpen(v)}
          projectId={project.id}
          initialName={project.name}
          initialDescription={project.description || ""}
          onUpdated={() => router.refresh()}
        />
      ) : null}
    </div>
  );
}
