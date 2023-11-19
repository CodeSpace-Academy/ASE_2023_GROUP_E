import { client } from "../client";

const db = client.db('devdb');

export async function getRecipes(collection, skipNo, limit, sort, tags, ingredients, category, instructions, andOr, viewRecipe){

  /**
   * These are condition, so that this database module can be reusable 
   */
  const getRecipesbyTags = tags.length > 0 && tags != '' ? {tags: { $all: tags}} : {}
  const getRecipesbyIngredients = ingredients.length > 0 && ingredients != '' ? { [andOr]: ingredients.map((key) => { return ({ [`ingredients.${key}`]: { $exists: true } }); }) } : {}
  const getRecipesbyCategory = category.split('').length > 1 ?  {category: category} : {}
  const getRecipesbyInstructionsLength = instructions > 0 ? { instructions: { $size: instructions }} : {}
  const getSpecificRecipebyId = viewRecipe ?  {_id : viewRecipe } : {}

  /**
   * This is mainly used to filter data, when the condition above are met, results will then be filtered by that expression.
   */
  const matchby = {$and: [getRecipesbyTags, getRecipesbyIngredients, getRecipesbyCategory, getRecipesbyInstructionsLength, getSpecificRecipebyId]}
  
  const recipes = await db.collection(collection).aggregate([

    {$match: matchby},
    {$skip: skipNo},
    {$limit: limit},
    {$sort: sort}

  ]).toArray()

  /**
   * counts the total number of results from the stages in the {@link recipes} function
   */
  const total = await db.collection(collection).aggregate( [{$match: matchby}, {$count: 'total'} ]).toArray()

  //If total recipe is undefined return 0
  const totalRecipes = total[0] ? total[0].total : 0

  /**
   * Some data compplains about the Id so this function removes
   * the Id
   */
  const removeId = recipes.map((doc) => {
    const { _id, ...data } = doc;
    return data;
  });

  return {
    recipes,
    totalRecipes,
    removeId
  }
}

export async function getFilteredObjects(object) {
  const results = await db.collection('recipes').find().limit(100).project(object).toArray();

  return results;
}