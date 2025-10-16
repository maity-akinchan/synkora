import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { sanitizeUser } from './user';
import { PublicUser } from '@/lib/models/user';
import jwt from 'jsonwebtoken';

export async function authorizationCheck() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Token missing' }, { status: 403 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.json({ message: 'Token valid', user: decoded });
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return NextResponse.json({ message: 'Token expired' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}

export async function setUserCookies(token: string, user: PublicUser) {
  try {
    const cookieStore = await cookies();
    console.log("Setting cookies!");

    // Set token cookie
    cookieStore.set('token', token, { httpOnly: true, path: '/' });

    // Set user cookie (not httpOnly)
    cookieStore.set('user', JSON.stringify(sanitizeUser(user)), { httpOnly: false, path: '/' });

    // Return the response with the cookies set
    return new Response('Cookies set successfully', {
      status: 200,
    });
  } catch (error) {
    console.error("Error setting cookies:", error);
    return new Response('Failed to set cookies', { status: 500 });
  }
}
