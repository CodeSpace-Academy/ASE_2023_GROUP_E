let MongoClient;
if (typeof window === 'undefined') {
  // This code will only run on the server side
  MongoClient = require('mongodb').MongoClient;
}

export async function fetchCategories() {
  let client;

  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      console.error('failed to connect');
      return {
        categories: [],
      };
    }

    if (!MongoClient) {
      console.error('MongoClient is not available on the client side');
      return {
        categories: [],
      };
    }

    client = new MongoClient(uri);

    await client.connect();
    const db = client.db('devdb');

    const categoriesCollection = db.collection('categories');
    const categoriesDocuments = await categoriesCollection.find({}).toArray();
    const categories = categoriesDocuments.map((doc) => doc.name);

    return {
      categories,
    };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return {
      categories: [],
    };
  } finally {
    if (client) {
      await client.close();
    }
  }
}
