import { client } from "../client";

export default async function getFilteredResults(input){
  const db = client.db('devdb');
  const documents = await db.collection('recipes').find({tags: { $all: input }}).limit(5).toArray();

  return documents;
}

export async function getFilteredTags() {
  const db = client.db('devdb');
  const results = await db.collection('recipes').find().limit(100).project({ tags: 1, _id: 0 }).toArray();

  return results;
}
