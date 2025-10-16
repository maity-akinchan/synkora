import { NextResponse } from 'next/server';
import { softDeleteUser } from '@/lib/models/user';

export async function deleteUserController(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });

    const success = await softDeleteUser(parseInt(id));
    return NextResponse.json({ success });
}