"use server"
import { signupController } from '@/lib/controllers/auth/signup';
import { getUserController } from '@/lib/controllers/auth/getuser';
import { updateUserController } from '@/lib/controllers/auth/updateuser';
import { deleteUserController } from '@/lib/controllers/auth/deleteuser';

/*
  This API route is not very well positioned or understandable..
  Might move these routes somewhere else in future.
*/

// This signup functionality is duplicate and is also provided by `/api/auth/signup`
export async function POST(req: Request) {
  signupController(req);
}

export async function GET(req: Request) {
  getUserController(req);
}

export async function PUT(req: Request) {
  updateUserController(req);
}

export async function DELETE(req: Request) {
  deleteUserController(req);
}
