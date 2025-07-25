import { NextResponse } from 'next/server';
import { createUser, getUserByEmail, getUserById, updateUser, deleteUser } from '@/lib/models/user';

export async function POST(req: Request) {
  const { name, email, password, username } = await req.json();

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return NextResponse.json({ success: false, message: 'User already exists' }, { status: 409 });
  }

  const id = await createUser({ name, email, password, username});
  return NextResponse.json({ success: true, id });
}


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const user = await getUserById(id);
    delete user?.password;
    if (user) return NextResponse.json(user);
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: false, message: 'No ID provided' }, { status: 400 });
}


export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const data = await req.json();

  if (!id) return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });

  const success = await updateUser(id, data);
  return NextResponse.json({ success });
}


export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });

  const success = await deleteUser(id);
  return NextResponse.json({ success });
}
