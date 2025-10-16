"use server"
import { handleLogin } from '@/lib/controllers/auth/login';
 
export async function POST(req: Request) {
  return handleLogin(req);
}