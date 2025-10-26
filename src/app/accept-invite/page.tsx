"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AcceptInvitePage() {
  const sp = useSearchParams();
  const token = sp.get("token");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function act(path: "accept" | "decline") {
    if (!token) return;
    setBusy(true);
    const res = await fetch(`/api/teams/invites/token/${token}/${path}`, { method: "POST" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) setStatus(data?.message || `Failed to ${path}`);
    else setStatus(path === "accept" ? "Joined team successfully" : "Declined invite");
    setBusy(false);
  }

  if (!token) return <div className="p-6">Invalid or missing token</div>;

  return (
    <div className="p-6 flex flex-col gap-4 items-start">
      <h1 className="text-2xl font-bold">Team Invitation</h1>
      <p>Accept this invitation with the logged-in account that matches the invited email.</p>
      {status && <p className="text-sm opacity-80">{status}</p>}
      <div className="flex gap-3">
        <Button disabled={busy} onClick={() => act("accept")}>Accept</Button>
        <Button variant="secondary" disabled={busy} onClick={() => act("decline")}>Decline</Button>
      </div>
    </div>
  );
}
