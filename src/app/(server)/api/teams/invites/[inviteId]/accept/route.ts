"use server";

import { NextResponse } from "next/server";
import { getAuthUserId } from "@/lib/utils/auth";
import { acceptInviteById } from "@/lib/models/invite";

// POST /api/teams/invites/[inviteId]/accept
export async function POST(_: Request, { params }: { params: { inviteId: string } }) {
  const userId = await getAuthUserId();
  if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const id = Number(params.inviteId);
  if (!id) return NextResponse.json({ success: false, message: "Invalid inviteId" }, { status: 400 });

  const res = await acceptInviteById(id, userId);
  if (!res.ok) return NextResponse.json({ success: false, message: res.error }, { status: 400 });
  return NextResponse.json({ success: true }, { status: 200 });
}
