import client from '../client';

/**
 * When user uses the search input
 * the user's input will be saved to the database
 * using this function
 * 
 * @param {string} username checks for the current user
 * @param {string} searchHistoryInput what the  user has searched
 */

export default async function addSearchHistory(username, searchHistoryInput) {
  const db = client.db('devdb');

  /**
   * We have to know if current user's has any search history, 
   * so that current user data is stored in one place
   */
  const checkUser = await db
    .collection('searchHistory')
    .findOne({ user: username });

  /**
   * If current user is found the search input will be added to the current user's object,
   * instead of creating a new object for the current user
   * 
   * New object that contains current user search history will  be created
   * only if the current user does not have any data in the searchHistory collection,
   * This is when the else statement run.
   */
  if (checkUser) {
    /**
     * we dont want the current user history to duplicate 
     * so we do a check first before adding the search input
     * 
     * If the current user has the search input saved,
     * we will not add the current search input into the searchHistory collection
     */
    const checkhistory = checkUser.input.includes(searchHistoryInput);

    if (!checkhistory) {
      await db.collection('searchHistory').updateOne(
        {
          user: username,
        },
        {
          $push: {
            input: {
              $each: [searchHistoryInput],
              $slice: -10,
            },
          },
        },
      );
    }

    return;
  } else {
    await db.collection('searchHistory').insertOne({
      user: username,
      input: [searchHistoryInput],
    });
  }
}
