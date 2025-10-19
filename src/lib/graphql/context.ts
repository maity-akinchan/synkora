// src/lib/graphql/context.ts
import { prisma } from "@/lib/db";

export interface GraphQLContext {
  prisma: typeof prisma;
}

export function createContext(): GraphQLContext {
  return { prisma };
}
