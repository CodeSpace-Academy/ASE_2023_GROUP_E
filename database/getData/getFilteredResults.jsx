import { client } from "../client";

export default async function getFilteredResults(object, input){
  const db = client.db('devdb');
  const documents = await db.collection('recipes').find({[object]: { $all: input }}).limit(5).toArray();

  return documents;
}

export async function getFilteredObjects(object) {
  const db = client.db('devdb');
  const results = await db.collection('recipes').find().limit(3).project(object).toArray();

  return results;
}
