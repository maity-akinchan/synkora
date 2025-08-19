import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { sanitizeUser } from './user';
import { PublicUser } from '../models/user';

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
export async function setUserCookies(token : string, user: PublicUser) {
  const cookieStore = await cookies()

    cookieStore.set({
      name: 'token',
      value: token as string,
      httpOnly: true,
      path: '/',
    })
    cookieStore.set({
      name: 'user',
      value: JSON.stringify(sanitizeUser(user)),
      httpOnly: false
    })
}