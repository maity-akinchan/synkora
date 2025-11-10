"use server"
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Handles user logout by clearing authentication cookies
 * @returns A NextResponse indicating success
 */
export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Delete the token cookie
    cookieStore.delete('token');
    
    // Delete the user cookie
    cookieStore.delete('user');

    return NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}
