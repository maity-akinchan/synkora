"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface InviteItem {
  id: number;
  team?: { id: number; name: string } | null;
  role?: { id: number; name: string } | null;
  status: string;
}

export default function MyInvites() {
  const [items, setItems] = useState<InviteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/teams/invites?mine=true");
    const data = await res.json().catch(() => ({}));
    if (!res.ok) setError(data?.message || "Failed to load invites");
    else setItems(data.invites || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function act(id: number, action: "accept" | "decline") {
    setMessage(null);
    const res = await fetch(`/api/teams/invites/${id}/${action}`, { method: "POST" });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) setMessage(d?.message || `${action} failed`);
    else {
      setMessage(action === "accept" ? "Joined team" : "Declined invite");
      load();
    }
  }

  if (loading) return <div className="p-3">Loading invites...</div>;
  if (error) return <div className="p-3 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">My Invites</h3>
      {message && <p className="text-sm opacity-80">{message}</p>}
      {items.length === 0 && <p className="text-sm opacity-70">No pending invites</p>}
      {items.map((it) => (
        <div key={it.id} className="border rounded-md p-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm">{it.team?.name ?? `Team #${it.team?.id ?? '-'}`}</span>
            <span className="text-xs opacity-70">Role: {it.role?.name ?? '-'}</span>
          </div>
          {it.status === 'PENDING' && (
            <div className="flex gap-2">
              <Button onClick={() => act(it.id, 'accept')}>Accept</Button>
              <Button variant="secondary" onClick={() => act(it.id, 'decline')}>Decline</Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
