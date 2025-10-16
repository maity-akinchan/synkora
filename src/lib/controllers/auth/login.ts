"use server"
import { getUserByUsername } from "@/lib/models/user";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { sanitizeUser } from '@/lib/utils/user';
import { setUserCookies } from "@/lib/utils/auth";
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
        { success: false, message: 'User not found' }, 
        { status: 404 } // Not Found
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
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    const publicUser = sanitizeUser(user);
    // 5. Set cookies for the session
    setUserCookies(token, publicUser);
    (await cookies()).set('myCookie', 'myValue');
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

// function verifyToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader?.split(' ')[1];

//   if (!token) return res.status(403).json({ message: 'Token required' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error('Token verification failed:', err);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// }
