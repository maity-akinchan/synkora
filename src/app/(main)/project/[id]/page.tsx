"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import KanbanBoard from "@/components/kanban/board";
import ProjectChatModal from "@/components/chat/project-chat-modal";
import ProjectAssistant from "@/components/assistant/project-assistant";

export default function ProjectPage() {
  const projectId = "demo-project-001";

  // 🧩 Mock Project
  const project = {
    name: "Synkora Dashboard",
    description: "A collaborative analytics and project management hub for real-time insights.",
  };

  // 👥 Mock Members
  const members = [
    { id: "1", name: "Qwert Singla", email: "qwert@example.com", image: "/avatars/user1.png" },
    { id: "2", name: "Aarav Mehta", email: "aarav@example.com", image: "/avatars/user2.png" },
    { id: "3", name: "Isha Kapoor", email: "isha@example.com", image: "/avatars/user3.png" },
  ];

  // ✅ Mock Tasks
  const tasks = [
    {
      id: "t1",
      title: "Design login UI",
      status: "To Do",
      sortOrder: 1,
      createdAt: new Date(),
      assignee: members[0],
      labels: [{ name: "UI" }, { name: "Frontend" }],
    },
    {
      id: "t2",
      title: "Implement authentication",
      status: "In Progress",
      sortOrder: 2,
      createdAt: new Date(),
      assignee: members[1],
      labels: [{ name: "Backend" }],
    },
    {
      id: "t3",
      title: "Deploy test build",
      status: "Review",
      sortOrder: 3,
      createdAt: new Date(),
      assignee: members[2],
      labels: [{ name: "Deployment" }],
    },
    {
      id: "t4",
      title: "Integrate AI Assistant",
      status: "Done",
      sortOrder: 4,
      createdAt: new Date(),
      assignee: members[0],
      labels: [{ name: "AI" }],
    },
  ];

  const currentUser = members[0];

  return (
    <main
      className="container mx-auto max-w-7xl px-4 py-8"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Header Section */}
      <div className="mb-6 flex items-start justify-between gap-4 border-b pb-4 border-[var(--color-border)]">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-primary)]">{project.name}</h1>
          {project.description && (
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{project.description}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/project/${projectId}/settings`}>
            <Button
              variant="ghost"
              style={{
                color: "var(--color-muted-foreground)",
                border: "1px solid var(--color-border)",
              }}
            >
              Settings
            </Button>
          </Link>
          <Link href={`/project/${projectId}/reports`}>
            <Button
              variant="ghost"
              style={{
                color: "var(--color-muted-foreground)",
                border: "1px solid var(--color-border)",
              }}
            >
              Reports
            </Button>
          </Link>
          <Link href={`/project/${projectId}/commits`}>
            <Button
              variant="ghost"
              style={{
                color: "var(--color-muted-foreground)",
                border: "1px solid var(--color-border)",
              }}
            >
              Commits
            </Button>
          </Link>

          {/* Chat Modal */}
          <ProjectChatModal
            projectId={projectId}
            currentUser={currentUser}
            buttonText="Open Chat"
          />
        </div>
      </div>

      {/* Kanban Board */}
      <section className="mb-10">
        <KanbanBoard
          projectId={projectId}
          initialTasks={tasks as any}
          members={members}
        />
      </section>

      {/* AI Project Assistant */}
      <section className="mt-8">
        <ProjectAssistant projectId={projectId} />
      </section>

      {/* Floating Chat Button (Mobile) */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <ProjectChatModal
          projectId={projectId}
          currentUser={currentUser}
          buttonText="Chat"
        />
      </div>
    </main>
  );
}
