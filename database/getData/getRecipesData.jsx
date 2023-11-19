import { client } from "../client";

const db = client.db('devdb');

export async function getRecipes(skipNo, limit, sort, tags, ingredients, category, instructions, andOr, viewRecipe){
  
  const getRecipesbyTags = tags.length > 0 && tags != '' ? {tags: { $all: tags}} : {}
  const getRecipesbyIngredients = ingredients.length > 0 && ingredients != '' ? { [andOr]: ingredients.map((key) => { return ({ [`ingredients.${key}`]: { $exists: true } }); }) } : {}
  const getRecipesbyCategory = category.split('').length > 1 ?  {category: category} : {}
  const getRecipesbyInstructionsLength = instructions > 0 ? { instructions: { $size: instructions }} : {}
  const getSpecificRecipebyId = viewRecipe ?  {_id : viewRecipe } : {}
  const total = {$and: [getRecipesbyTags, getRecipesbyIngredients, getRecipesbyCategory, getRecipesbyInstructionsLength, getSpecificRecipebyId]}
  
  const recipes = await db.collection('recipes').aggregate([

    {$match: total},
    {$skip: skipNo},
    {$limit: limit},
    {$sort: sort}

  ]).toArray()

  const totalR = await db.collection('recipes').aggregate( [{$match: total}, {$count: 'total'} ]).toArray()

  //If total recipe is undefined return 0
  const totalRecipes = totalR[0] ? totalR[0].total : 0

  return {
    recipes,
    totalRecipes
  }
}

export async function getFilteredObjects(object) {
  const results = await db.collection('recipes').find().limit(100).project(object).toArray();

  return results;
}