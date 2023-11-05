import { client } from "../client";

export default async function getFilteredTags(input){
  const db = client.db('devdb');
  const documents = await db.collection('recipes').find({tags: { $all: input }}).limit(5).toArray();

  return documents;
}

export async function getFilteredIngredients(input) {
  const db = client.db('devdb');

  const recipes = await db.collection('recipes').find({$and: input.map(key => ({ [`ingredients.${key}`]: { $exists: true } }))}).limit(100).toArray();

  return recipes;
}

export async function getFilteredObjects(object) {
  const db = client.db('devdb');
  const results = await db.collection('recipes').find().limit(3).project(object).toArray();

  return results;
}
