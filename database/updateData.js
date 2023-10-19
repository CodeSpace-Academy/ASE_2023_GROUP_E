import { MongoClient } from 'mongodb';



export default async function run() {
  // let client;

  // try {
  //   const uri = process.env.MONGODB_URI;

  //   if (!uri) {
  //     console.error('Failed to connect');
  //     return null;
  //   }

  //   client = new MongoClient(uri);
  //   await client.connect();

  //   return client; // Return the client for database operations

  // } catch (error) {
  //   console.error('Error connecting to the database:', error);
  //   return null;
  // }

  const client = await MongoClient.connect('mongodb+srv://groupe:lx0hIlKaDof7KBJY@groupe.pse1kuk.mongodb.net/devdb?retryWrites=true&w=majority')

  return client
}


