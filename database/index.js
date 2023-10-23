import { MongoClient } from 'mongodb';



export async function run(pageSize) {
 
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
      .skip(pageSize - 25)
      .limit(25)
      .toArray();

    const totalDataLength = await fetchTotalDataLength(); // Fetch the total data length asynchronously

    return {
      documents,
      totalDataLength,
    };

  } catch (error) {
    console.error('Error connecting to the database:', error);
    return {
      documents: [],
      totalDataLength: 0,
    };
  } finally {
    if (client) {
      await client.close();
    }
  }
}



//this function fetches the length of the total recipes from the database using .countDocuments() and it is called in the main run function

export async function fetchTotalDataLength() {
  let client;
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('failed to connect');
      return 0;
    }

    client = new MongoClient(uri);
    await client.connect();
    const db = client.db('devdb');

    const totalDataLength = await db.collection('recipes').countDocuments();
    return totalDataLength;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return 0;
  } finally {
    if (client) {
      await client.close();
    }
  }
}
