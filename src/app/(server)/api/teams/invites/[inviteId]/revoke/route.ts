"use server";

import { NextResponse } from "next/server";
import { getAuthUserId } from "@/lib/utils/auth";
import { revokeInvite, resendInvite } from "@/lib/models/invite";
import { sendTeamInviteEmail } from "@/lib/utils/email";

// POST /api/teams/invites/[inviteId]/revoke
export async function POST(_: Request, { params }: { params: { inviteId: string } }) {
  const userId = await getAuthUserId();
  if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const id = Number(params.inviteId);
  if (!id) return NextResponse.json({ success: false, message: "Invalid inviteId" }, { status: 400 });

  const ok = await revokeInvite(id);
  return NextResponse.json({ success: ok }, { status: ok ? 200 : 500 });
}
