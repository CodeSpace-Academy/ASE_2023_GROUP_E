import { client } from "../client";

const db = client.db('devdb');

export async function getFilteredIngredients(input, andOr) {

  const filterIngredients = { [andOr]: input.map((key) => { return ({ [`ingredients.${key}`]: { $exists: true } }); }) };
  const recipes = await db.collection('recipes').find(filterIngredients).limit(50).toArray();
  const totalMatchingRecipes = await db.collection('recipes').countDocuments(filterIngredients);

  return { recipes, totalMatchingRecipes };
}

export async function getRecipe(skipNo, limit, sort, tags, ingredients, category, instructions){

  const tagsInput = tags 
  const IngredientsInput = ingredients
  const categoryInput = category
  const instructionsLength = instructions

  const getRecipesbyTags = tagsInput.length > 0 && tags != '' ? {tags: { $all: tagsInput}} : {}
  const getRecipesbyIngredients = IngredientsInput.length > 0 && ingredients != '' ? { $or: IngredientsInput.map((key) => { return ({ [`ingredients.${key}`]: { $exists: true } }); }) } : {}
  const getRecipesbyCategory = categoryInput.split('').length > 1 ?  {category: categoryInput} : {}
  const getRecipesbyInstructionsLength = instructionsLength > 0 ? { instructions: { $size: instructionsLength }} : {}
  const total = {$and: [getRecipesbyTags, getRecipesbyIngredients, getRecipesbyCategory, getRecipesbyInstructionsLength]}
  
  const recipes = await db.collection('recipes').aggregate([

    {$match: total},
    {$skip: skipNo},
    {$limit: limit},
    {$sort: sort}

  ]).toArray()

  const totalR = await db.collection('recipes').aggregate( [{$match: total}, {$count: 'total'} ]).toArray()

  //If total recipe is undefined return 0
  const totalRecipe = totalR[0] ? totalR[0].total : 0

  return {
    recipes,
    totalRecipe 
  }
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