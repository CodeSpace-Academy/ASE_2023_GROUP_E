import { client } from '../client'

export default async function addSearchHistory(username, searchHistoryInput){
  const db = client.db('devdb')

  const checkUser = await db.collection('searchHistory').findOne({ user: username })

  if(checkUser){
    await db.collection('searchHistory').updateOne({
      user: username
    }, {
      $push:{
        input: searchHistoryInput
      }
    })
    return
  }

  await db.collection('searchHistory').insertOne({
    user: username,
    input: [searchHistoryInput],
  })
}