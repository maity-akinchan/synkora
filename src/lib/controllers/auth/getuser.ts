import {  getUserById } from '@/lib/models/user';
import { NextResponse } from 'next/server';
import { sanitizeUser } from '@/lib/utils/user';

export async function getUserController(req: Request) {
     const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      
      if (id) {
        const user = await getUserById(parseInt(id));
        if (user) return NextResponse.json(sanitizeUser(user));
        return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
      }
    
      return NextResponse.json({ success: false, message: 'No ID provided' }, { status: 400 });
}