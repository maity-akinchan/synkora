"use server";

import { NextResponse } from "next/server";
import { getAuthUserId } from "@/lib/utils/auth";
import { resendInvite } from "@/lib/models/invite";
import { sendTeamInviteEmail } from "@/lib/utils/email";

// POST /api/teams/invites/[inviteId]/resend
export async function POST(_: Request, { params }: { params: { inviteId: string } }) {
  const userId = await getAuthUserId();
  if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const id = Number(params.inviteId);
  if (!id) return NextResponse.json({ success: false, message: "Invalid inviteId" }, { status: 400 });

  const result = await resendInvite(id);
  if (!result.ok) return NextResponse.json({ success: false, message: result.error }, { status: 400 });

  const baseUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const acceptLink = `${baseUrl}/accept-invite?token=${result.token}`;
  await sendTeamInviteEmail(result.email, acceptLink);

  return NextResponse.json({ success: true, acceptLink }, { status: 200 });
}
