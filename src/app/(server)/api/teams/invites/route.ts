"use server";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAuthUserId } from "@/lib/utils/auth";
import { getOrCreateTeamRole } from "@/lib/models/role";
import { createInvite, listTeamInvites, listUserInvitesByEmail } from "@/lib/models/invite";
import { sendTeamInviteEmail } from "@/lib/utils/email";

// GET /api/teams/invites?teamId=123 OR /api/teams/invites?mine=true
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mine = searchParams.get("mine") === "true";
  const teamIdParam = searchParams.get("teamId");

  if (mine) {
    const userId = await getAuthUserId();
    if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    // Pull user email from cookie 'user' or fetch
    const userCookie = (await cookies()).get('user')?.value;
    let email: string | null = null;
    try { email = userCookie ? JSON.parse(userCookie).email : null; } catch {}
    if (!email) return NextResponse.json({ success: false, message: "Missing user email" }, { status: 400 });
    const invites = await listUserInvitesByEmail(email);
    return NextResponse.json({ success: true, invites }, { status: 200 });
  }

  const teamId = teamIdParam ? Number(teamIdParam) : Number((await cookies()).get("teamId")?.value);
  if (!teamId) return NextResponse.json({ success: false, message: "Missing teamId" }, { status: 400 });
  const invites = await listTeamInvites(teamId);
  return NextResponse.json({ success: true, invites }, { status: 200 });
}

// POST /api/teams/invites
// Body: { email: string, roleName?: string, expiresInHours?: number }
export async function POST(req: Request) {
  const userId = await getAuthUserId();
  if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  const { email, roleName, expiresInHours } = await req.json().catch(() => ({}));
  if (!email || typeof email !== 'string') {
    return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });
  }

  const cookieTeamId = (await cookies()).get("teamId")?.value;
  const teamId = cookieTeamId ? Number(cookieTeamId) : undefined;
  if (!teamId) {
    return NextResponse.json({ success: false, message: "Missing teamId cookie" }, { status: 400 });
  }

  const role = await getOrCreateTeamRole(roleName || 'Member');
  const { invite, token } = await createInvite({ teamId, email, roleId: role.id, inviterId: userId, expiresInHours });

  const baseUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const acceptLink = `${baseUrl}/accept-invite?token=${token}`;
  await sendTeamInviteEmail(email, acceptLink);

  return NextResponse.json({ success: true, inviteId: invite.id, acceptLink }, { status: 201 });
}
