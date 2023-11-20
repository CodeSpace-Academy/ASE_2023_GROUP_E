import { client } from '../client';

export default async function addSearchHistory(username, searchHistoryInput) {
  const db = client.db('devdb');

  //checks if user has any history
  const checkUser = await db
    .collection('searchHistory')
    .findOne({ user: username });

  //if user has history, we then push his new search into his history
  if (checkUser) {
    //checks users history to not include duplicates
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
    //if user does not have history, we then create a space where the user's history will be stored
    await db.collection('searchHistory').insertOne({
      user: username,
      input: [searchHistoryInput],
    });
  }
}
