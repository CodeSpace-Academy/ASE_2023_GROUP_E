import { MongoClient } from "mongodb";

export async function run() {
  const page = 1;
  const pageSize = 20;
  let client;

  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      console.error("MONGODB_URI environment variable not set.");
      return [];
    }

    client = new MongoClient(uri);

    await client.connect();
    const db = client.db('devdb');

    const documents = await db
      .collection('recipes')
      .find()
      .skip(page * pageSize)
      .limit(pageSize)
      .toArray();

    return documents;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return [];
  } finally {
    if (client) {
      await client.close();
    }
  }
}
