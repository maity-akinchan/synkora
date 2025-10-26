import { prisma, dbConnection } from "@/lib/db";
import { TeamInvite } from "@/generated/prisma/client";
import { createMember } from "@/lib/models/team";
import { getUserById } from "@/lib/models/user";
import { createHash, randomBytes } from "crypto";

function sha256(input: string) {
  return createHash("sha256").update(input).digest("hex");
}

export async function createInvite(params: {
  teamId: number;
  email: string;
  roleId: number;
  inviterId: number;
  expiresInHours?: number;
}): Promise<{ invite: TeamInvite; token: string }>
{
  await dbConnection;
  const token = randomBytes(24).toString("hex");
  const tokenHash = sha256(token);
  const expiresAt = new Date(Date.now() + (params.expiresInHours ?? 72) * 60 * 60 * 1000);

  const invite = await prisma.teamInvite.create({
    data: {
      teamId: params.teamId,
      email: params.email.toLowerCase(),
      roleId: params.roleId,
      inviterId: params.inviterId,
      tokenHash,
      expiresAt,
    },
  });

  return { invite, token };
}

export async function getInviteByToken(token: string) {
  await dbConnection;
  const tokenHash = sha256(token);
  return prisma.teamInvite.findUnique({ where: { tokenHash } });
}

export async function listTeamInvites(teamId: number) {
  await dbConnection;
  return prisma.teamInvite.findMany({
    where: { teamId },
    orderBy: { createdAt: "desc" },
    include: {
      role: { select: { id: true, name: true } },
      inviter: { select: { id: true, email: true } },
      acceptedBy: { select: { id: true, email: true } },
    },
  });
}

export async function listUserInvitesByEmail(email: string) {
  await dbConnection;
  return prisma.teamInvite.findMany({
    where: { email: email.toLowerCase(), status: "PENDING" },
    orderBy: { createdAt: "desc" },
    include: {
      team: { select: { id: true, name: true } },
      role: { select: { id: true, name: true } },
      inviter: { select: { id: true, email: true } },
    },
  });
}

export async function revokeInvite(inviteId: number) {
  await dbConnection;
  const updated = await prisma.teamInvite.update({ where: { id: inviteId }, data: { status: "REVOKED" } });
  return !!updated;
}

export async function resendInvite(inviteId: number) {
  await dbConnection;
  const existing = await prisma.teamInvite.findUnique({ where: { id: inviteId } });
  if (!existing) return { ok: false as const, error: "Invite not found" };
  if (existing.status === "ACCEPTED") return { ok: false as const, error: "Already accepted" };
  const token = randomBytes(24).toString("hex");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000);
  const updated = await prisma.teamInvite.update({
    where: { id: inviteId },
    data: { tokenHash, expiresAt, status: "PENDING" },
  });
  return { ok: true as const, token, invite: updated, email: existing.email };
}

export async function acceptInvite(token: string, userId: number) {
  await dbConnection;
  const tokenHash = sha256(token);
  const invite = await prisma.teamInvite.findUnique({ where: { tokenHash } });
  if (!invite) return { ok: false, error: "Invalid invite" };
  return acceptInviteById(invite.id, userId);
}

export async function acceptInviteById(inviteId: number, userId: number) {
  await dbConnection;
  const invite = await prisma.teamInvite.findUnique({ where: { id: inviteId } });
  if (!invite) return { ok: false, error: "Invalid invite" };
  if (invite.status !== "PENDING") return { ok: false, error: "Invite not pending" };
  if (invite.expiresAt && invite.expiresAt.getTime() < Date.now()) {
    await prisma.teamInvite.update({ where: { id: invite.id }, data: { status: "EXPIRED" } });
    return { ok: false, error: "Invite expired" };
  }

  const user = await getUserById(userId);
  if (!user) return { ok: false, error: "User not found" };
  if (user.email.toLowerCase() !== invite.email.toLowerCase()) {
    return { ok: false, error: "Invite email mismatch. Login with the invited email." };
  }

  await createMember({ teamId: invite.teamId, userId: user.id, roleId: invite.roleId });
  await prisma.teamInvite.update({ where: { id: invite.id }, data: { status: "ACCEPTED", acceptedById: user.id } });
  return { ok: true };
}

export async function declineInvite(token: string, userId?: number) {
  await dbConnection;
  const tokenHash = sha256(token);
  const invite = await prisma.teamInvite.findUnique({ where: { tokenHash } });
  if (!invite) return { ok: false, error: "Invalid invite" };
  return declineInviteById(invite.id, userId);
}

export async function declineInviteById(inviteId: number, userId?: number) {
  await dbConnection;
  const invite = await prisma.teamInvite.findUnique({ where: { id: inviteId } });
  if (!invite) return { ok: false, error: "Invalid invite" };
  if (invite.status !== "PENDING") return { ok: false, error: "Invite not pending" };
  await prisma.teamInvite.update({ where: { id: invite.id }, data: { status: "DECLINED", acceptedById: userId } });
  return { ok: true };
}
