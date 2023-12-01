import client from "../client";

/**
 *
 * This function is used to modify our database, either by adding new information or
 * modifying what is already there.
 *
 * @param {String} action - This is the main purpose of the function, which decides
 * what the function will do. {@link action} accept Mongodb methods such as $push, $set.
 *
 * @param {String} key - This will be the key when we add data to mongodb. In case where we are
 * editing what is already there the key arguement should be named exactly as on mongodb/database.
 *
 * @param {String} recipeId - This is basically our find, It help our edit only a specif object from
 * our database by using its unique _id.
 * In our case when we are on a specif recipe its unique id is pushed to the url, then that sames id
 * that is on the url is used to identify which object we will modify.
 *
 * @param {any} recipeValue - as we have mentioned the {@link key}, {@link recipeValue} will be the
 * value of this key. our value can be anything like String, object, array ...etc
 */

export default async function editRecipe(action, key, recipeId, recipeValue) {
  const db = client.db('devdb');

  await db.collection('recipes').updateOne({
    /**
     * used to find which recipe/object we want to modify {@link recipeId}
     */
    _id: recipeId,
  }, {
    /**
     * {@link action}
     * {@link key}
     * {@link recipeValue}
     */
    [action]: {
      [key]: recipeValue,
    },
  });
}
