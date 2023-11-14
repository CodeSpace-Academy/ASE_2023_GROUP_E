import { client } from "./client";

export async function fetchAllergensFromDatabase() {

  const db = client().db('devdb');

  const collection = await db.collection('allergens').find().toArray();

  return collection
  
}
