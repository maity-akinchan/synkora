// app/api/graphql/route.ts
import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs } from '@/lib/graphql/typeDefs'
import { resolvers } from '@/lib/graphql/resolvers'
import { prisma } from '@/lib/db' // 👈 import your Prisma client
import { NextRequest } from 'next/server'

const yoga = createYoga<{
  req: NextRequest
}>({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),

  // 👇 This is the missing piece
  context: async ({ request }) => ({
    prisma, // ✅ now available in all resolvers
    request,
  }),

  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
})

export { yoga as GET, yoga as POST }
