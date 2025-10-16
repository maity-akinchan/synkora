import { PublicUser } from '@/lib/models/user';

export function sanitizeUser(user: PublicUser): PublicUser {
  return {
    id: user.id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    avatarUrl: user.avatarUrl,
    jobRole: user.jobRole,
    companyName: user.companyName,
    dateOfBirth: user.dateOfBirth,
    bio: user.bio,
    goals: user.goals
  };
}