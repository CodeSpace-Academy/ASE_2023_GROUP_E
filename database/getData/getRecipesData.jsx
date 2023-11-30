import client from "../client";

const db = client.db('devdb');

/**
 *
 * @param {String} collection - is the name of the file/collection we are accesing from our database
 *
 * @param {Number} skipNo - Is the number used defined how many object/recipes do we skip.
 * eg if we have 10 objects then our skip number is 3 we will not display object before 3.
 *
 * @param {Number} limit - Is a number that limits how may recipes we show. eg we have 10 recipes
 * the our limit is 4 only 4 recipes will be shown.
 *
 * @param {Object} sort - is an object that has a key of what we are sorting and which order
 * we are sorting e.g {cookTime: 1} this will sort our recipes in a ascending order,
 * -1 should be used to sort in descending.
 *
 * @param {*} tags
 * @param {*} ingredients
 * @param {*} categoryValue
 * @param {*} instructions
 * @param {*} andOr
 * @param {*} viewRecipe
 * @param {*} expressionInput
 * @param {*} username
 * @param {*} titles
 * @returns
 */

export default async function getRecipes(
  collection,
  skipNo,
  limit,
  sort,
  tags,
  ingredients,
  categoryValue,
  instructions,
  andOr,
  viewRecipe,
  expressionInput,
  username,
  titles,
) {
  // const title = 'L'
  /**
   * These condition, are used so that this database module can be reusable
   */
  const getSearchResults = titles && titles[0].split('').length > 0 ? { $and: titles.map((title) => { return { title: { $regex: new RegExp(title, 'i') } }; }) } : {};
  const getRecipesbyTags = tags.length > 0 && tags !== '' ? { tags: { $all: tags } } : {};
  const getRecipesbyIngredients = ingredients.length > 0 && ingredients !== '' ? { [andOr]: ingredients.map((key) => { return ({ [`ingredients.${key}`]: { $exists: true } }); }) } : {};
  const getRecipesbyCategory = categoryValue.split('').length > 1 ? { category: categoryValue } : {};
  const getRecipesbyInstructionsLength = instructions > 0
    ? { instructions: { $size: instructions } } : {};
  const getSpecificRecipebyId = viewRecipe ? { _id: viewRecipe } : {};
  const expression = expressionInput;

  /**
   * This filters the user, to fetch the search history of a specific user.
   *
   * firstly we check if we are on the searchHistory collection
   * if true this object is pushed into the matchby array if not we push an empty object,
   * empty object means we dont use this filter
   */
  const user = collection === 'searchHistory' ? { user: username } : {};

  /**
   * This is mainly used to filter data, when the condition above are met,
   *  results will then be filtered by that expression.
   */
  const matchby = {
    $and: [
      getRecipesbyTags,
      getRecipesbyIngredients,
      getRecipesbyCategory,
      getRecipesbyInstructionsLength,
      getSpecificRecipebyId,
      user,
      getSearchResults],
  };

  const recipes = await db.collection(collection).aggregate([

    /**
     * This condition checks if we want to use the project stage by
     * checking if we have value on the {@link expression} variable.
     * At the moment we do not us both match and project stage at the same time,
     * so if expression has value we use the project stage then leave out the match stage.
     */
    expression.split('').length > 1 ? { $project: { [expression]: 1, _id: 0 } } : { $match: matchby },
    { $skip: skipNo },
    { $limit: limit },
    // {
    //   $addFields: {
    //     numberOfSteps: { $size: "$instructions" }
    //   }
    // },

    { $sort: sort },

  ]).toArray();

  /**
   * counts the total number of results from the stages in the {@link recipes} function
   */
  const total = await db.collection(collection).aggregate([{ $match: matchby }, { $count: 'total' }]).toArray();

  // If total recipe is undefined return 0
  const totalRecipes = total[0] ? total[0].total : 0;

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
    removeId,
  };
}
