// components/instructionfailure.js

import React from 'react';
import { MongoClient } from 'mongodb';  // Import the necessary MongoDB-related modules here

function Error({ message }) {
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  );
}

class InstructionLoadFailure {
  static handleRecipeInstructionError(error) {
    if (error.message === 'Failed to load instructions') {
      // Display the error message to the user or take appropriate action
      console.error('Failed to load instructions. Please try again later.');
    } else {
      // Handle other types of errors as needed
      console.error('An unexpected error occurred:', error);
    }
  }

  // Your database-related functions go here
  static async connectDatabase() {
    const client = await MongoClient.connect(
      'mongodb+srv://groupe:lx0hIlKaDof7KBJY@groupe.pse1kuk.mongodb.net/devdb?retryWrites=true&w=majority'
    );
    return client;
  }

  static async insertDocument(client, collection, document) {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);
    return result;
  }

  static async getAllDocuments(client, collection, sort) {
    const db = client.db();
    const documents = await db
      .collection(collection)
      .find()
      .sort(sort)
      .toArray();
    return documents;
  }
}

export { Error, InstructionLoadFailure };
