import { client } from "../client";


export default async function getFilteredTags(input){
  const db = client().db('devdb');


  const countQuery = { tags: { $all: input } };
  const documents = await db.collection('recipes').find(countQuery).limit(50).toArray();
  const totalMatchingRecipes = await db.collection('recipes').countDocuments(countQuery);


  return { documents, totalMatchingRecipes };
}


export async function getFilteredIngredients(input, andOr) {
  const db = client().db('devdb');

  const filterIngredients = { [andOr]: input.map((key) => { return ({ [`ingredients.${key}`]: { $exists: true } }); }) };
  const recipes = await db.collection('recipes').find(filterIngredients).limit(50).toArray();
  const totalMatchingRecipes = await db.collection('recipes').countDocuments(filterIngredients);

  return { recipes, totalMatchingRecipes };
}

export async function getFilteredInstructions(input) {
  const db = client().db('devdb');

  const filterInstructions = {
    instructions: {
      $size: parseInt(input, 10),
    },
  };

  const recipes = await db.collection('recipes').find(filterInstructions).limit(50).toArray();
  const totalMatchingRecipes = await db.collection('recipes').countDocuments(filterInstructions);

  return { recipes, totalMatchingRecipes };
}



export async function getFilteredObjects(object) {
  const db = client().db('devdb');
  const results = await db.collection('recipes').find().limit(100).project(object).toArray();


  return results;
}



