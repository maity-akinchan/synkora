// interface User {
//   uid?: string;
//   name: string;
//   username: string;
//   email: string;
//   registerDate: Date;
//   authInfo: {
//     authType: 'local' | 'oauth';
//     pwdHash?: string;
//     oauthData?: string[];
//   }
// }

// function createUser(body: User) {

// }

// function getUserByEmail(email : String) {

// }

// function getUserById(uid : String) {

// }

// function getUserByUname(uname : String) {

// }

// function unameExists(uname : String) : Boolean{
//   // Function to check if username exists in database.
//   return true;
// }


// export default User;
// export {createUser, getUserByEmail, getUserById, getUserByUname, unameExists}

import {connectToDatabase, ObjectId, Collection} from "@/lib/db"

export interface User {
  name: string;
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
  const result = await collection.insertOne({ ...user, createdAt: new Date() });
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
