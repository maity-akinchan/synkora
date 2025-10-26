"use server";

import { NextResponse } from "next/server";
import { getAuthUserId } from "@/lib/utils/auth";
import { updateMember, removeUserFromTeam } from "@/lib/models/team";

// PUT /api/teams/members/[memberId]
// Body: { roleId?: number, roleName?: string }
export async function PUT(req: Request, { params }: { params: { memberId: string } }) {
  const userId = await getAuthUserId();
  if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const id = Number(params.memberId);
  if (!id) return NextResponse.json({ success: false, message: "Invalid memberId" }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const { roleId, roleName } = body || {};

  let finalRoleId = roleId as number | undefined;
  if (!finalRoleId && typeof roleName === 'string') {
    // Lazily create or fetch role by name
    const { getOrCreateTeamRole } = await import("@/lib/models/role");
    const r = await getOrCreateTeamRole(roleName);
    finalRoleId = r.id;
  }

  if (!finalRoleId) return NextResponse.json({ success: false, message: "roleId or roleName required" }, { status: 400 });

  const ok = await updateMember(id, { roleId: finalRoleId });
  return NextResponse.json({ success: ok }, { status: ok ? 200 : 500 });
}

// DELETE /api/teams/members/[memberId]?teamId=...&userId=...
export async function DELETE(req: Request, { params }: { params: { memberId: string } }) {
  const userId = await getAuthUserId();
  if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const teamId = Number(searchParams.get("teamId"));
  const targetUserId = Number(searchParams.get("userId"));
  if (!teamId || !targetUserId) {
    return NextResponse.json({ success: false, message: "teamId and userId required" }, { status: 400 });
  }

  const ok = await removeUserFromTeam(teamId, targetUserId);
  return NextResponse.json({ success: ok }, { status: ok ? 200 : 500 });
}