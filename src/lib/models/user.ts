import {connectToDatabase, ObjectId, Collection} from "@/lib/db"
import {handleLogin, verifyToken} from "@/lib/controllers/auth";
import bcrypt from "bcryptjs";

export interface User {
  id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export async function getUsersCollection(): Promise<Collection<User>> {
  const db = await connectToDatabase();
  return db.collection<User>('users');
}

export async function createUser(user: User) {
  const collection = await getUsersCollection();
  const hashedPassword = await bcrypt.hashSync(user.password, 10);
  const result = await collection.insertOne({ ...user, password: hashedPassword, createdAt: new Date()});
  return result.insertedId;
}

export async function getUserByEmail(email: string) {
  const collection = await getUsersCollection();
  return await collection.findOne({ email });
}

export async function getUserById(id: string) {
  const collection = await getUsersCollection();
  return await collection.findOne({ _id: new ObjectId(id) });
}
export async function getUserByUsername(uname: string) {
  const collection = await getUsersCollection();
  return await collection.findOne({username: uname});
}
export async function updateUser(id: string, data: Partial<User>) {
  const collection = await getUsersCollection();
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
  return result.modifiedCount > 0;
}

export async function deleteUser(id: string) {
  const collection = await getUsersCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
