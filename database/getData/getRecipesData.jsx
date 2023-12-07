import client from "../client";
/**
 * Retrieves recipes based on various search criteria from the specified collection.
 *
 * @param {string} collection - The name of the MongoDB collection to query.
 * @param {number} skipNo - The number of documents to skip in the result set.
 * @param {number} limit - The maximum number of documents to return.
 * @param {object} sort - The sorting criteria for the query results.
 * @param {string[]} tags - An array of tags to filter recipes by.
 * @param {string[]} ingredients - An array of ingredients to filter recipes by.
 * @param {string} category - The category to filter recipes by.
 * @param {number} instructions - The number of instructions a recipe should have.
 * @param {string} andOr - The logical operator ('$and' or '$or') for ingredients filter.
 * @param {string} viewRecipe - The specific recipe ID to retrieve.
 * @param {string} expressionInput - The field to project in the MongoDB aggregation pipeline.
 * @param {string} username - The username for filtering search history.
 * @param {string[]} titles - An array of titles to search for in recipes.
 *
 * @returns {object} - An object containing recipes, total number of recipes, and recipes with IDs removed.
 */
const db = client.db('devdb');

export default async function getRecipes(collection, skipNo, limit, sort, tags, ingredients, category, instructions, andOr, viewRecipe, expressionInput, username, titles){

  // const title = 'L'
  /**
   * These condition, are used so that this database module can be reusable 
   */
  const getSearchResults = titles && titles[0].split('').length  > 0 ? { $and : titles.map(title => ({ title: { $regex: new RegExp(title, 'i') } }))} : {}
  const getRecipesbyTags = tags.length > 0 && tags != '' ? {tags: { $all: tags}} : {}
  const getRecipesbyIngredients = ingredients.length > 0 && ingredients != '' ? { [andOr]: ingredients.map((key) => { return ({ [`ingredients.${key}`]: { $exists: true } }); }) } : {}
  const getRecipesbyCategory = category.split('').length > 1 ?  {category: category} : {}
  const getRecipesbyInstructionsLength = instructions > 0 ? { instructions: { $size: instructions }} : {}
  const getSpecificRecipebyId = viewRecipe ?  {_id : viewRecipe } : {}
  const expression = expressionInput

  /**
   * This filters the user, to fetch the search history of a specific user.
   * 
   * firstly we check if we are on the searchHistory collection
   * if true this object is pushed into the matchby array if not we push an empty object,
   * empty object means we dont use this filter
   */
  const user = collection === 'searchHistory' ? { user: username } : {}

  /**
   * This is mainly used to filter data, when the condition above are met, results will then be filtered by that expression.
   */
  const matchby = {$and: [getRecipesbyTags, getRecipesbyIngredients, getRecipesbyCategory, getRecipesbyInstructionsLength, getSpecificRecipebyId, user, getSearchResults]}
  
  const recipes = await db.collection(collection).aggregate([

    
    /**
     * This condition checks if we want to use the project stage by checking if we have value on the {@link expression} variable.
     * At the moment we do not us both match and project stage at the same time, 
     * so if expression has value we use the project stage then leave out the match stage.
     */
    expression.split('').length > 1 ? {$project: { [expression]: 1, _id: 0 }} : {$match: matchby},
    {$skip: skipNo},
    {$limit: limit},
    limit !== 5 && {
      $addFields: {
        numberOfSteps: { $size: "$instructions" }
      }
    },

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


export async function getRecipe(collection, viewRecipe, expressionInput, username, titles){

  const getSearchResults = titles && titles[0].split('').length  > 0 ? { $and : titles.map(title => ({ title: { $regex: new RegExp(title, 'i') } }))} : {}
  const getSpecificRecipebyId = viewRecipe ?  {_id : viewRecipe } : {}
  const expression = expressionInput

  const user = collection === 'searchHistory' ? { user: username } : {}

  const matchby = {$and: [ getSpecificRecipebyId, user, getSearchResults]}
  
  const recipes = await db.collection(collection).aggregate([

    expression.split('').length > 1 ? {$project: { [expression]: 1, _id: 0 }} : {$match: matchby},

  ]).toArray()

  return {
    recipes,
  }
}