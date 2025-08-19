"use server"

import { getUserById, createUser, getUserByUsername } from "../models/user";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { sanitizeUser } from "../utils/user";
import { cookies } from 'next/headers'
import { setUserCookies } from "../utils/auth";
import { useReactTable } from "@tanstack/react-table";


function verifyToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(403).json({ message: 'Token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
}

async function handleLogin(username: string, password: string) {
  if (!username || !password) {
    return { message: 'Missing username or password' };
  }

  try {
    const user = await getUserByUsername(username, true);
    if (!user || !user.password || !user.name) {
      return { message: 'User not found' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { message: 'Invalid credentials' };
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    const publicUser = sanitizeUser(user);
    if (!publicUser.name) {
      return { message: 'User data incomplete' };
    }
    setUserCookies(token, publicUser);
    return { token, user: publicUser };
  } catch (error) {
    console.error('Login error:', error);
    return { message: 'Server error during login' };
  }
}

export { handleLogin, verifyToken };