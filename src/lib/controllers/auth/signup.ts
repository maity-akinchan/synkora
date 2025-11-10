import { createUser, getUserByEmail, getUserByUsername } from '@/lib/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function signupController(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, username } = body;

        // Validate input
        if (!email || !password || !username) {
            return NextResponse.json(
                { success: false, message: 'Email, username, and password are required' },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { success: false, message: 'Password must be at least 8 characters' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUserByEmail = await getUserByEmail(email);
        if (existingUserByEmail) {
            return NextResponse.json(
                { success: false, message: 'Email already in use' },
                { status: 409 }
            );
        }

        const existingUserByUsername = await getUserByUsername(username);
        if (existingUserByUsername) {
            return NextResponse.json(
                { success: false, message: 'Username already taken' },
                { status: 409 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const fullName = name || username;
        const avatarUrl = "";
        const id = await createUser({ fullName, email, hashedPassword, username, avatarUrl });

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { success: false, message: 'An internal server error occurred' },
            { status: 500 }
        );
    }
}