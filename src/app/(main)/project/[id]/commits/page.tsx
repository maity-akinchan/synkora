"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface CommitItem {
  sha: string;
  message: string;
  authorName: string | null;
  authorAvatar: string | null;
  htmlUrl: string;
  date: string | null;
  branch: string;
}

export default function ProjectCommitsPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const projectId = useMemo(() => (Array.isArray(params?.id) ? params.id[0] : (params?.id as string)), [params]);

  const [branch, setBranch] = useState<string>(searchParams?.get("branch") ?? "");
  const [commits, setCommits] = useState<CommitItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCommits = async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const u = new URL(window.location.origin + "/api/github/commits");
      u.searchParams.set("projectId", projectId);
      if (branch.trim()) u.searchParams.set("branch", branch.trim());
      const res = await fetch(u.toString());
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load commits");
      setCommits(data.commits || []);
    } catch (e: any) {
      setError(e.message || "Failed to load commits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Commits</h1>
        <div className="flex gap-2">
          <Link href={`/project/${projectId}`}>
            <Button variant="secondary">Back to Project</Button>
          </Link>
          <Link href={`/project/${projectId}/settings`}>
            <Button variant="ghost">Settings</Button>
          </Link>
        </div>
      </div>

      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Branch</label>
          <input
            className="w-full rounded-md border p-2 text-sm"
            placeholder="Leave blank for default branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
        </div>
        <Button onClick={fetchCommits}>Refresh</Button>
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Failed to load commits</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {loading ? (
        <div className="text-sm">Loading commits…</div>
      ) : commits && commits.length > 0 ? (
        <ul className="divide-y rounded-md border">
          {commits.map((c) => (
            <li key={c.sha} className="flex items-start gap-4 p-4">
              {c.authorAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.authorAvatar} alt={c.authorName || "author"} className="h-8 w-8 rounded-full" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-muted" />)
              }
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate font-medium">{(c.message || "").split("\n")[0]}</div>
                  <a className="shrink-0 text-xs text-blue-600 hover:underline" href={c.htmlUrl} target="_blank" rel="noreferrer">
                    View
                  </a>
                </div>
                <div className="mt-1 text-xs text-muted-foreground flex flex-wrap items-center gap-2">
                  {c.authorName ? <span>by {c.authorName}</span> : null}
                  {c.date ? <><span>•</span><span>{new Date(c.date).toLocaleString()}</span></> : null}
                  {c.branch ? <><span>•</span><span>branch: {c.branch}</span></> : null}
                  <span>•</span>
                  <code className="rounded bg-muted px-1 py-0.5">{c.sha.slice(0, 7)}</code>
                </div>
                {c.message && c.message.includes("TASK-") ? (
                  <div className="mt-1 text-xs">
                    {/* Optional: Link detected task IDs */}
                    {(c.message.match(/TASK-\d+/g) || []).map((t) => (
                      <span key={t} className="mr-2 rounded bg-amber-100 px-1 py-0.5 text-amber-700">{t}</span>
                    ))}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-muted-foreground">No commits found or GitHub integration not configured.</div>
      )}
    </main>
  );
}
