"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface InviteItem {
  id: number;
  email: string;
  role?: { id: number; name: string } | null;
  status: string;
  createdAt?: string;
  expiresAt?: string;
}

export function InvitesList() {
  const [items, setItems] = useState<InviteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/teams/invites");
    const data = await res.json().catch(() => ({}));
    if (!res.ok) setError(data?.message || "Failed to load invites");
    else setItems(data.invites || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function revoke(id: number) {
    setMessage(null);
    const res = await fetch(`/api/teams/invites/${id}/revoke`, { method: "POST" });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setMessage(d?.message || "Revoke failed");
    } else {
      setMessage("Invite revoked");
      load();
    }
  }

  async function resend(id: number) {
    setMessage(null);
    const res = await fetch(`/api/teams/invites/${id}/resend`, { method: "POST" });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage(d?.message || "Resend failed");
    } else {
      setMessage(d?.acceptLink ? `Resent. Link: ${d.acceptLink}` : "Resent");
      load();
    }
  }

  if (loading) return <div className="p-4">Loading invites...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Pending Invites</h2>
      {message && <p className="text-sm opacity-80 break-all">{message}</p>}
      <div className="flex flex-col gap-2">
        {items.length === 0 && <p className="text-sm opacity-70">No invites</p>}
        {items.map((it) => (
          <div key={it.id} className="border rounded-md p-3 flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-sm">{it.email}</span>
              <span className="text-xs opacity-70">{it.role?.name ?? `role:${it.role?.id ?? '-'}`} • {it.status}</span>
            </div>
            {it.status === "PENDING" && (
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => resend(it.id)}>Resend</Button>
                <Button onClick={() => revoke(it.id)}>Revoke</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
