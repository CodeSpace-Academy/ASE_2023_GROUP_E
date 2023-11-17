import { client } from '../client';

export default async function getSearchHistory(username) {
  const db = client.db('devdb');
  const results = db.collection('searchHistory').find({ user: username }).toArray();

  return results;
}
