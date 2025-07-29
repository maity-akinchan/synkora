import { prisma, connectToDatabase } from "@/lib/db"; // Adjust the import path as necessary
import bcrypt from 'bcryptjs';
import {User} from "@/generated/prisma/client";

export type FullUser = Omit<User, 'createdAt'>;
export type NewUser = Omit<User, 'createdAt' | 'id'>;
export type PublicUser = Omit<User, 'password' | 'createdAt'>;
export type SafeUser = Omit<User, 'password'>;

export async function createUser(user: NewUser) {
  await connectToDatabase();
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  const result = await prisma.user.create({
    data: {
      name: user.name,
      username: user.username,
      email: user.email,
      password: hashedPassword,
      createdAt: new Date(),
    },
  });
  return result.id;
}

export async function getUserByEmail(email: string, sensitive : boolean = false) : Promise<FullUser | null> {
  await connectToDatabase();
  return await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      password: sensitive
    },
  });
}

export async function getUserById(id: string, sensitive : boolean = false): Promise <FullUser | null> {
  await connectToDatabase();

  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      password: sensitive
    },
  });
}

export async function getUserByUsername(username: string, sensitive : boolean = false) : Promise<FullUser | null> {
  await connectToDatabase();
  return await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      password: sensitive
    }
  });
}

export async function updateUser(id: string, data: Partial<User>) {
  await connectToDatabase();
  const result = await prisma.user.update({
    where: { id },
    data,
  });
  return result !== null;
}

export async function deleteUser(id: string) {
  await connectToDatabase();
  const result = await prisma.user.delete({
    where: { id },
  });
  return result !== null;
}
