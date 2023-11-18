import { client } from "../client";

const db = client.db('devdb');

export default async function getFilteredTags(input){


  const countQuery = { tags: { $all: input } };
  const documents = await db.collection('recipes').find(countQuery).limit(50).toArray();
  const totalMatchingRecipes = await db.collection('recipes').countDocuments(countQuery);

  return { documents, totalMatchingRecipes };
}

export async function getFilteredIngredients(input, andOr) {

  const filterIngredients = { [andOr]: input.map((key) => { return ({ [`ingredients.${key}`]: { $exists: true } }); }) };
  const recipes = await db.collection('recipes').find(filterIngredients).limit(50).toArray();
  const totalMatchingRecipes = await db.collection('recipes').countDocuments(filterIngredients);

  return { recipes, totalMatchingRecipes };
}

export async function getRecipe(skipNo, limit, sort, tags){

  const tagsInput = tags 
  const IngredientsInput = [/* 'blueberries' */]
  let category = ""
//Frozen Desserts
  const getRecipesbyTags = tagsInput.length > 0 && tags != '' ? {tags: { $all: tagsInput}} : {}
  const getRecipesbyIngredients = IngredientsInput.length > 0 ?{ $or: IngredientsInput.map((key) => { return ({ [`ingredients.${key}`]: { $exists: true } }); }) } : {}
  const getRecipesbyCategory = category.split('').length > 1 ?  {category: category} : {}
  
  const results = await db.collection('recipes').aggregate([

    {$match: {$and: [getRecipesbyTags, getRecipesbyIngredients, getRecipesbyCategory]}},
    {$skip: skipNo},
    {$limit: limit},
    {$sort: sort}

  ]).toArray()

  return results
}










export async function getFilteredInstructions(input) {

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
  const results = await db.collection('recipes').find().limit(100).project(object).toArray();

  return results;
}

export async  function getTagsOptionsList(expression){

  const results = await db.collection('recipes').aggregate([

    {$limit: 100 },
    {$unwind: expression},
    {$group: {_id : expression}},

  ]).toArray()

  return results
}