import { createUser, getUserByEmail } from '@/lib/models/user';
import { NextResponse } from 'next/server';

export async function signupController(req: Request) {
    const { fullName, email, hashedPassword, username } = await req.json();

    const avatarUrl = "";
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
    return NextResponse.json({ success: false, message: 'User already exists' }, { status: 409 });
    }
    
    const id = await createUser({ fullName, email, hashedPassword, username, avatarUrl});
    return NextResponse.json({ success: true, id });
}