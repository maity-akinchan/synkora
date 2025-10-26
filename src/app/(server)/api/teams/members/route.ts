"use server";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAuthUserId } from "@/lib/utils/auth";
import { getUserByEmail } from "@/lib/models/user";
import { createMember, getTeamMembers } from "@/lib/models/team";
import { getOrCreateTeamRole } from "@/lib/models/role";
import { prisma } from "@/lib/db";

// GET /api/teams/members
// Lists members for current team (from cookie) or by ?teamId=
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const teamIdParam = searchParams.get("teamId");
  const cookieStore = await cookies();
  const cookieTeamId = cookieStore.get("teamId")?.value;
  const teamId = Number(teamIdParam || cookieTeamId);

  if (!teamId || Number.isNaN(teamId)) {
    return NextResponse.json({ success: false, message: "Missing teamId" }, { status: 400 });
  }

  const members = await getTeamMembers(teamId);
  return NextResponse.json({ success: true, members }, { status: 200 });
}

// POST /api/teams/members
// Adds a member by existing user email or userId; if already a member, updates their role.
export async function POST(req: Request) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { email, userId: targetUserId, roleName } = await req.json().catch(() => ({}));

  const cookieStore = await cookies();
  const teamIdRaw = cookieStore.get("teamId")?.value;
  const teamId = teamIdRaw ? Number(teamIdRaw) : undefined;
  if (!teamId) {
    return NextResponse.json({ success: false, message: "Missing teamId cookie" }, { status: 400 });
  }

  let newUserId: number | null = null;
  if (typeof targetUserId === "number") {
    newUserId = targetUserId;
  } else if (typeof email === "string") {
    const u = await getUserByEmail(email);
    if (!u) {
      return NextResponse.json({ success: false, message: "User not found. Invitation flow not yet implemented." }, { status: 404 });
    }
    newUserId = u.id;
  } else {
    return NextResponse.json({ success: false, message: "Provide email or userId" }, { status: 400 });
  }

  const role = await getOrCreateTeamRole(roleName || "Member");

  // Check if already a member; if yes, update role instead of creating duplicate
  const existing = await prisma.teamMember.findFirst({ where: { teamId, userId: newUserId! } });
  if (existing) {
    await prisma.teamMember.update({ where: { id: existing.id }, data: { roleId: role.id } });
    return NextResponse.json({ success: true, teamMemberId: existing.id, updated: true }, { status: 200 });
  }

  const teamMemberId = await createMember({ teamId, userId: newUserId!, roleId: role.id });
  return NextResponse.json({ success: true, teamMemberId, created: true }, { status: 201 });
}
