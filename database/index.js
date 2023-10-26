import connectClient from './client';

export async function run(pageSize) {
 
  let client;

  try {
    client = await connectClient()

    if (!client) {
      console.error('failed to connect');
      return [];
    }
    const db = client.db('devdb');

    const documents = await db
      .collection('recipes')
      .find()
      .skip(pageSize - 12)
      .limit(12)
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
      console.log('')
    }
  }
}



//this function fetches the length of the total recipes from the database using .countDocuments() and it is called in the main run function

export async function fetchTotalDataLength() {
  let client;
  try {
    const client = await connectClient()
    if (!client) {
      console.error('failed to connect');
      return 0;
    }
    
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
