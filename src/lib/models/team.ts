"use server"

import { prisma, dbConnection } from "@/lib/db"; 
import { Prisma, Team, TeamMember} from "@/generated/prisma/client";


// --- Team Functions ---

/**
 * Creates a new team and optionally adds the creator as the first member.
 * @param team - The team data.
 * @param ownerId - The ID of the user creating the team.
 * @param ownerRoleId - The ID for the 'Admin' or 'Owner' role.
 * @returns The new team's ID.
 */
export async function createTeam(team: Omit<Team, 'id' | 'createdAt'>, ownerId: number, ownerRoleId: number): Promise<number> {
    await dbConnection;

    const result = await prisma.team.create({
        data: {
            name: team.name,
            logoUrl: team.logoUrl,
            members: {
                create: {
                    userId: ownerId,
                    roleId: ownerRoleId,
                }
            }
        },
    });

    return result.id;
}

/**
 * Retrieves a single team by its ID, including its members and their user details.
 * @param id - The team's ID.
 * @returns The team object with members, or null if not found.
 */
export async function getTeamById(id: number) {
    await dbConnection;
    return prisma.team.findUnique({
        where: { id },
        include: {
            members: {
                include: {
                    user: true, // Include user details for each member
                    role: true,   // Include role name
                }
            },
            projects: true, // Include the team's projects
        }
    });
}

/**
 * Retrieves all teams a specific user is a member of.
 * @param userId - The user's ID.
 * @returns An array of team objects.
 */
export async function getTeamsForUser(userId: number): Promise<Team[]> {
    await dbConnection;
    return prisma.team.findMany({
        where: {
            members: {
                some: {
                    userId: userId,
                },
            },
        },
    });
}

/**
 * Updates a team's information.
 * @param id - The ID of the team to update.
 * @param data - The partial team data.
 * @returns True if the update was successful.
 */
export async function updateTeam(id: number, data: Partial<Team>): Promise<boolean> {
    await dbConnection;
    const result = await prisma.team.update({
        where: { id },
        data: { ...data },
    });
    return !!result;
}

/**
 * Deletes a team. This will fail if the team still owns projects,
 * as per the `onDelete: NoAction` rule in your schema.
 * @param id - The ID of the team to delete.
 * @returns True if deletion was successful.
 */
export async function deleteTeam(id: number): Promise<boolean> {
    await dbConnection;
    try {
        await prisma.team.delete({ where: { id } });
        return true;
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // P2003 indicates a foreign key constraint failure
            if (e.code === 'P2003') {
                console.error("Deletion failed: This team likely still has projects associated with it.");
                return false;
            }
        }
        throw e;
    }
}


// --- Team Member Functions ---

/**
 * Adds a new member to a team.
 * @param teamMember - Object containing teamId, userId, and roleId.
 * @returns The new teamMember's ID.
 */
export async function createMember(teamMember: Omit<TeamMember, 'id' | 'joinedAt'>): Promise<number> {
    await dbConnection;
    const result = await prisma.teamMember.create({ data: teamMember });
    return result.id;
}

/**
 * Updates a team member's role.
 * @param id - The ID of the teamMember record.
 * @param data - Partial data, typically just the roleId.
 * @returns True if the update was successful.
 */
export async function updateMember(id: number, data: Partial<TeamMember>): Promise<boolean> {
    await dbConnection;
    const result = await prisma.teamMember.update({
        where: { id },
        data: { ...data },
    });
    return !!result;
}

/**
 * Removes a user from a team.
 * @param teamId - The ID of the team.
 * @param userId - The ID of the user to remove.
 * @returns True if the removal was successful.
 */
export async function removeUserFromTeam(teamId: number, userId: number): Promise<boolean> {
    await dbConnection;
    const result = await prisma.teamMember.deleteMany({
        where: { teamId, userId },
    });
    return result.count > 0;
}

