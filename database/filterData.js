// database/filterData.js

import { MongoClient } from 'mongodb';

export async function fetchIngredients() {
  let client;

  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      console.error('Failed to connect: MongoDB URI is missing.');
      return {
        ingredients: [],
      };
    }

    client = new MongoClient(uri);

    await client.connect();
    const db = client.db('devdb');

    // Access the 'recipes' collection in the 'devdb' database and fetch all documents.
    const ingredientsCollection = db.collection('recipes');
    const ingredientsDocuments = await ingredientsCollection.find({}).sort().toArray();

    // Extract and map only the names of ingredients from the documents.
    const ingredients = ingredientsDocuments.map((doc) => {
      // Assuming that 'ingredients' is an array of objects in the document.
      const ingredientNames = doc.ingredients.map(ingredient => ingredient.name);
      return {
        _id: doc._id,
        ingredients: ingredientNames,
      };
    });
    

    // Return the extracted ingredients.
    return {
      ingredients,
    };
  } catch (error) {
    console.error('Error connecting to the database:', error);

    // If there is an error, return an empty array for ingredients.
    return {
      ingredients: [],
    };
  } finally {
    // Close the MongoDB client connection, if it was established.
    if (client) {
      await client.close();
    }
  }

  
}
