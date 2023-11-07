import { client } from '../client';

export default async function getFilteredTags(input) {
  const db = client.db('devdb');
  const countQuery = { tags: { $all: input } };
  const documents = await db.collection('recipes').find(countQuery).limit(5).toArray();
  const totalMatchingRecipes = await db.collection('recipes').countDocuments(countQuery);

  return { documents, totalMatchingRecipes };
}

export async function getFilteredIngredients(input, andOr) {
  const db = client.db('devdb');

  const filterIngredients = { [andOr]: input.map((key) => { return ({ [`ingredients.${key}`]: { $exists: true } }); }) };
  const recipes = await db.collection('recipes').find(filterIngredients).limit(5).toArray();
  const totalMatchingRecipes = await db.collection('recipes').countDocuments(filterIngredients);

  return { recipes, totalMatchingRecipes };
}

export async function getFilteredObjects(object) {
  const db = client.db('devdb');
  const results = await db.collection('recipes').find().limit(3).project(object)
    .toArray();
  return results;
}
