"use client";

import { useState } from "react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface RepoItem {
  id: number;
  name: string;
  fullName: string;
  private: boolean;
  owner: string;
  htmlUrl: string;
  defaultBranch: string;
  pushedAt?: string | null;
}

export default function ProjectSettingsPage() {
  const projectId = "demo-project-001";
  const [connecting, setConnecting] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 🧩 Hardcoded repositories
  const repos: RepoItem[] = [
    {
      id: 1,
      name: "project-dashboard",
      fullName: "qwertsingla/project-dashboard",
      private: false,
      owner: "qwertsingla",
      htmlUrl: "https://github.com/qwertsingla/project-dashboard",
      defaultBranch: "main",
      pushedAt: "2025-10-18T14:23:00Z",
    },
    {
      id: 2,
      name: "synkora-platform",
      fullName: "qwertsingla/synkora-platform",
      private: true,
      owner: "qwertsingla",
      htmlUrl: "https://github.com/qwertsingla/synkora-platform",
      defaultBranch: "main",
      pushedAt: "2025-10-20T09:45:00Z",
    },
  ];

  const onConnect = (repo: RepoItem) => {
    setConnecting(repo.fullName);
    setTimeout(() => {
      setConnecting(null);
      setSuccess(`✅ Successfully connected ${repo.fullName} to this project.`);
      setError(null);
    }, 1000);
  };

  return (
    <main
      className="container mx-auto max-w-3xl px-4 py-8 space-y-6"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4 border-[var(--color-border)]">
        <h1 className="text-2xl font-bold text-[var(--color-primary)]">Project Settings</h1>
        <div className="flex gap-2">
          <Link href={`/project/${projectId}`}>
            <Button
              style={{
                background: "var(--bg-secondary)",
                color: "var(--foreground)",
              }}
            >
              Back to Project
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
              View Commits
            </Button>
          </Link>
        </div>
      </div>

      {/* GitHub Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--color-primary)]">
          Connect GitHub Repo
        </h2>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Select one of your repositories to link with this project. You must
          have admin or push access.
        </p>

        {/* Success/Failure Messages */}
        {error && (
          <Alert variant="destructive" className="border border-[var(--color-error)] bg-[var(--color-error-light)]">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border border-[var(--color-success)] bg-[var(--color-success-light)]">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Repository List */}
        {repos.length > 0 ? (
          <ul className="divide-y rounded-md border border-[var(--color-border)] bg-[var(--background-alt)]">
            {repos.map((r) => (
              <li
                key={r.id}
                className="flex items-center justify-between gap-4 p-4 transition hover:bg-[var(--background-salt)]"
              >
                <div className="min-w-0">
                  <div className="truncate font-medium">{r.fullName}</div>
                  <div className="text-xs text-[var(--color-muted-foreground)] flex gap-2 flex-wrap">
                    <a
                      className="hover:underline text-[var(--color-info-dark)]"
                      href={r.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on GitHub
                    </a>
                    <span>•</span>
                    <span>{r.private ? "Private" : "Public"}</span>
                    {r.pushedAt && (
                      <>
                        <span>•</span>
                        <span>
                          Last push:{" "}
                          {new Date(r.pushedAt).toLocaleString("en-IN")}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="shrink-0">
                  <Button
                    onClick={() => onConnect(r)}
                    disabled={connecting === r.fullName}
                    style={{
                      background: connecting === r.fullName
                        ? "var(--color-muted-dark)"
                        : "var(--color-primary)",
                      color: "var(--foreground)",
                    }}
                  >
                    {connecting === r.fullName ? "Connecting…" : "Connect"}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
            <div>No repositories found.</div>
          </div>
        )}
      </section>
    </main>
  );
}
