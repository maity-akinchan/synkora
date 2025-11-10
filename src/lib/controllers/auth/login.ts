"use server"
import { getUserByUsername } from "@/lib/models/user";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { sanitizeUser } from '@/lib/utils/user';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Handles the entire login process, from request parsing to response generation.
 * This function contains all business logic for authentication.
 * @param req - The incoming Request object.
 * @returns A NextResponse object for the client.
 */
export async function handleLogin(req: Request) {
  try {
    const { username, password } = await req.json();

    // 1. Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 } // Bad Request
      );
    }

    // 2. Find the user
    const user = await getUserByUsername(username);
    if (!user || !user.hashedPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' }, 
        { status: 401 } // Unauthorized - Don't reveal if user exists
      );
    }

    // 3. Verify the password
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 } // Unauthorized
      );
    }

    // 4. Generate token and prepare user data
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
    const publicUser = sanitizeUser(user);
    
    // 5. Set cookies for the session
    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === 'production';
    
    const cookieOptions = {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
      sameSite: 'lax' as const,
      secure: isProduction, // Only use secure in production (requires HTTPS)
    };
    
    cookieStore.set('token', token, cookieOptions);
    cookieStore.set('user', JSON.stringify(publicUser), { 
      ...cookieOptions,
      httpOnly: false, // Allow client-side access to user data
    });
    
    // 6. Return a successful response
    return NextResponse.json(
      { success: true, token: token, user: publicUser },
      { status: 200 } // OK
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An internal server error occurred' },
      { status: 500 } // Internal Server Error
    );
  }
}
