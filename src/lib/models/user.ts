import { prisma, dbConnection } from "@/lib/db";
import bcrypt from "bcryptjs";
import { User } from "@/generated/prisma/client";

export type PublicUser = Omit<User, 'hashedPassword' | 'referral'>

// --- User Functions ---

/**
 * Creates a new user with a hashed password.
 * @param user - User data, including a plain text password.
 * @returns The new user's ID.
 */
export async function createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'jobTitle' | 'companyName' | 'teamName' | 'referral' | 'jobRole' | 'dateOfBirth' | 'bio' | 'goals'>) {
    await dbConnection;

    const hashedPassword = await bcrypt.hash(user.hashedPassword, 10);

    const result = await prisma.user.create({
        data: {
            ...user,
            hashedPassword: hashedPassword,
        },
    });
    return result.id;
}

/**
 * Finds a user by their unique email address.
 * @param email - The email of the user to find.
 * @returns The user object or null if not found.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
    await dbConnection;
    return prisma.user.findUnique({ where: { email } });
}

/**
 * Finds a user by their username.
 * @param username - The username of the user to find.
 * @returns The user object or null if not found.
 */
export async function getUserByUsername(username: string): Promise<User | null> {
    await dbConnection;
    return prisma.user.findUnique({ where: { username } });
}
/**
 * Finds a user by their ID.
 * @param id - The ID of the user to find.
 * @returns The user object or null if not found.
 */
export async function getUserById(id: number): Promise<User | null> {
    await dbConnection;
    return prisma.user.findUnique({ where: { id } });
}
/**
 * Updates a user's data. Hashes the password if a new one is provided.
 * @param id - The ID of the user to update.
 * @param data - The partial user data to update.
 * @returns True if the update was successful.
 */
export async function updateUser(id: number, data: Partial<User>): Promise<boolean> {
    await dbConnection;
    
    const updateData = { ...data };
    if (updateData.hashedPassword) {
        updateData.hashedPassword = await bcrypt.hash(updateData.hashedPassword, 10);
    }

    const result = await prisma.user.update({
        where: { id },
        data: updateData,
    });

    return !!result;
}

/**
 * "Soft deletes" a user by truncating personal information.
 * This honors your "no complete delete" rule.
 * @param id - The ID of the user to anonymize.
 * @returns True if the operation was successful.
 */
export async function softDeleteUser(id: number): Promise<boolean> {
    await dbConnection;

    const result = await prisma.user.update({
        where: { id },
        data: {
            fullName: "Deactivated User",
            email: `deleted-${id}@synkora.com`,
            hashedPassword: "DEACTIVATED",
            avatarUrl: null,
            bio: null,
            // Add any other personal fields to nullify
        },
    });

    return !!result;
}