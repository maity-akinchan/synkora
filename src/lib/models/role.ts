"use server";

import { prisma, dbConnection } from "@/lib/db";
import { Prisma, TeamRole } from "@/generated/prisma/client";

/**
 * Create a new TeamRole.
 * @param role - Data for new TeamRole (excluding id and createdAt).
 * @returns The created TeamRole's ID.
 */
export async function createTeamRole(role: Omit<TeamRole, "id" | "name"> & { name: string }): Promise<number> {
  await dbConnection;
  const result = await prisma.teamRole.create({
    data: {
      name: role.name,
    }
  });
  return result.id;
}

/**
 * Get a TeamRole by its ID.
 * @param id - TeamRole ID.
 * @returns The TeamRole object or null.
 */
export async function getTeamRoleById(id: number): Promise<TeamRole | null> {
  await dbConnection;
  return prisma.teamRole.findUnique({
    where: { id }
  });
}

/**
 * Get all TeamRoles.
 * @returns List of all TeamRoles.
 */
export async function getAllTeamRoles(): Promise<TeamRole[]> {
  await dbConnection;
  return prisma.teamRole.findMany();
}

/**
 * Update a TeamRole by ID.
 * @param id - TeamRole ID.
 * @param data - Partial TeamRole data (e.g. only name).
 * @returns True if updated successfully.
 */
export async function updateTeamRole(id: number, data: Partial<TeamRole>): Promise<boolean> {
  await dbConnection;
  const updated = await prisma.teamRole.update({
    where: { id },
    data
  });
  return !!updated;
}

/**
 * Delete a TeamRole by ID.
 * Catches foreign key constraint errors if role is still assigned.
 * @param id - TeamRole ID.
 * @returns True if deleted successfully, false if constraint prevents deletion.
 */
export async function deleteTeamRole(id: number): Promise<boolean> {
  await dbConnection;
  try {
    await prisma.teamRole.delete({
      where: { id }
    });
    return true;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2003") {
        console.error("Role deletion failed: This role is likely assigned to team members.");
        return false;
      }
    }
    throw e;
  }
}
