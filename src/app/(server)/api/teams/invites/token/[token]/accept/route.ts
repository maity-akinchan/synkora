"use server";

import { NextResponse } from "next/server";
import { acceptInvite } from "@/lib/models/invite";
import { getAuthUserId } from "@/lib/utils/auth";

// POST /api/teams/invites/token/[token]/accept
export async function POST(_: Request, { params }: { params: { token: string } }) {
  const userId = await getAuthUserId();
  if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const token = params.token;
  const res = await acceptInvite(token, userId);
  if (!res.ok) return NextResponse.json({ success: false, message: res.error }, { status: 400 });
  return NextResponse.json({ success: true }, { status: 200 });
}