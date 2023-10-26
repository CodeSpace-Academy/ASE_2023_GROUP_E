import { client } from "./client";

export async function fetchAllergensFromDatabase() {

  try {
    // const client = await connectClient()

    if (!client) {
      console.error('failed to connect');
      return {
        allergensDocuments: [],
      };
    }

    const db = client.db('devdb');

    const allergensCollection = db.collection('allergens');
    const allergensDocuments = await allergensCollection.find().toArray();
    // Remove the id and return the allergens
    const allergens = allergensDocuments.map((doc) => {
      const { _id, ...allergensList } = doc;
      return allergensList;
    });

    return {
      allergens,
    };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return {
      allergens: [],
    };
  } finally {
    if (client) {
      await client.close();
    }
  }
}
