"use server"

import { NextResponse } from 'next/server';
import { handleLogin } from '@/lib/controllers/auth';
 

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 } // Bad Request
      );
    }

    const result = await handleLogin(username, password);

    if (result.message === 'User not found') {
      return NextResponse.json({ success: false, message: result.message }, { status: 404 }); // Not Found
    }

    if (result.message === 'Invalid credentials') {
      return NextResponse.json({ success: false, message: result.message }, { status: 401 }); // Unauthorized
    }

    if (result.message) {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 }); // Internal Server Error
    }

    return NextResponse.json({ success: true, token: result.token, user: result.user }, { status: 200 }); // OK
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}