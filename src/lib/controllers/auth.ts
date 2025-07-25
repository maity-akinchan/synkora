import {getUserById, createUser, getUserByUsername} from "../models/user";
import {User} from "@/lib/models/user"
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

function verifyToken(req: any, res: any, next: any) {
  const bearer = req.headers['authorization'];
  const token = bearer && bearer.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

async function handleLogin(reqBody : User, res: any) {
  const { username, password } = reqBody;
  await getUserByUsername(username).then(async (user) => {
    if (!user) return res.status(401).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ token });
  });
  
}

export {handleLogin, verifyToken}
