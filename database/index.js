const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function run() {
  const page = 1;
  const pageSize = 20;

  try {
    const connectClient = await client.connect();
    const db = connectClient.db('devdb');

    const documents = await db
      .collection('recipes')
      .find()
      .skip(page * pageSize)
      .limit(pageSize)
      .toArray();

    return documents;
  } catch (error) {
    console.error("Connection failed");
  } finally {
    await client.close();
  }
}
