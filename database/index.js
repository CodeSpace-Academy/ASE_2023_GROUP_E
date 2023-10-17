import { MongoClient } from 'mongodb';

export async function run(pageSize) {
  const page = 1;
  // const pageSize = 20;
  let client;

  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      console.error('failed to connect');
      return [];
    }

    client = new MongoClient(uri);

    await client.connect();
    const db = client.db('devdb');

    const documents = await db
      .collection('recipes')
      .find()
      .skip(pageSize - 100)
      .limit(100)
      .toArray();

    const menuList = documents.map((doc) => {
      const { _id, ...menuData } = doc;
      return menuData;
    });

    return documents;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return [];
  } finally {
    if (client) {
      await client.close();
    }
  }
}
