"use server"

import { prisma, dbConnection } from "@/lib/db"; 
import bcrypt from "bcryptjs";
import { Prisma, User } from "@/generated/prisma/client";

// Types
export type NewUser = Omit<User, "id" | "createdAt" | "updatedAt">;
export type PublicUser = Omit<User, "password">;
export type FullUser = User;


// Create a new user
export async function createUser(user: NewUser): Promise<string> {
  await dbConnection;

  const hashedPassword = bcrypt.hashSync(user.password, 10);

  const result = await prisma.user.create({
    data: {
      name: user.name,
      username: user.username,
      email: user.email,
      password: hashedPassword,
      avatar: ""
    },
  });

  return result.id;
}

// Helper: dynamic select with optional password
const userSelect = (sensitive: boolean) =>
  ({
    id: true,
    name: true,
    username: true,
    email: true,
    ...(sensitive ? { password: true } : {}),
  }) satisfies Prisma.UserSelect;

// Find by email
export async function getUserByEmail(
  email: string,
  sensitive = false
): Promise<Partial<User> | null> {
  await dbConnection;
  return prisma.user.findUnique({
    where: { email },
    select: userSelect(sensitive),
  });
}

// Find by id
export async function getUserById(
  id: string,
  sensitive = false
): Promise<Partial<User> | null> {
  await dbConnection;
  return prisma.user.findUnique({
    where: { id },
    select: userSelect(sensitive),
  });
}

// Find by username
export async function getUserByUsername(
  username: string,
  sensitive = false
): Promise<Partial<User> | null> {
  await dbConnection;
  return prisma.user.findUnique({
    where: { username },
    select: userSelect(sensitive),
  });
}

// Update user (auto-hash password if present)
export async function updateUser(
  id: string,
  data: Partial<User>
): Promise<boolean> {
  await dbConnection;

  const updateData = { ...data };

  if (updateData.password) {
    updateData.password = bcrypt.hashSync(updateData.password, 10);
  }

  const result = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  return !!result;
}

// Delete user
export async function deleteUser(id: string): Promise<boolean> {
  await dbConnection;
  const result = await prisma.user.delete({
    where: { id },
  });
  return !!result;
}
