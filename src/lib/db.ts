/* TODO: Add Type Implications, Implement the functions and any other you may require 
   Uncomment the code below...
*/

// import mongoose from "mongoose";

// mongoose.connect("mongodb://localhost:32768/application_name")
//     .then(() => console.log('Connected to database!'))
//     .catch((err) => console.log('Error connecting to database:', err));

// async function createDb(objData, dataSchema, debugName) {
//     // Create a new object of specified schema and save it to the database
    
// }

// async function readDb(id, dataSchema, debugName) {
//     //Find an object from the database by id and return it.
    
// }
// async function readDbField(field, value, dataSchema, debugName) {
//     //Find an object from the database by matching field value and return it.
    
// }

// async function updateDb(id, updateFields, dataObject, debugName) {
//     // Find and update an object in the database by id.
    
// }

// export {createDb, readDb, updateDb, readDbField};

import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import { User } from '@/lib/models/user';

const uri = process.env.MONGODB_URI ||  "mongodb://localhost:27017/collab";
console.log(uri);
const dbName = 'sample_mflix'; 

let client: MongoClient;
let db: Db;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
  }
  return db;
}

export {connectToDatabase, ObjectId, Collection, Db};


