import { signupController } from "@/lib/controllers/auth/signup";

export async function POST(req: Request) {
  signupController(req);
}