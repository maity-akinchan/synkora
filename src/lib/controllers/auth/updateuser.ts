import { NextResponse } from 'next/server';
import { updateUser } from '@/lib/models/user';

export async function updateUserController(req: Request) {
    const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      const data = await req.json();
    
      if (!id) return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });
    
      const success = await updateUser(parseInt(id), data);
      return NextResponse.json({ success });
}