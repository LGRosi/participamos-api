import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("ParticipamosDB");
const users = db.collection('Users');

async function find(filter) {
   await client.connect();
   return await users.find(filter).toArray();
}

async function create(user) {
   const newUser = {
      ...user
   }
   await client.connect();

   const userExits = await users.findOne({ email: newUser.email });

   if (userExits) {
      throw new Error('El email ya existe en un usuario');
   }

   const salt = await bcrypt.genSalt(10);
   newUser.password = await bcrypt.hash(newUser.password, salt);

   await users.insertOne(newUser);
   
   return newUser;
}

async function remove(id) {
   await client.connect();

   const result = await users.deleteOne({ _id: ObjectId(id) });

   if (result.deletedCount === 0) {
      throw new Error('El usuario no existe');
   }
}

export {
   find,
   create,
   remove
}