import { MongoClient } from 'mongodb';

export async function run() {
  const page = 1;
  const pageSize = 20;
  let client;

  try {
    const uri = process.env.mongoConnectionString;

    if (!uri) {
      console.error('failed to connect');
      return [];
    }

    client = new MongoClient(uri);

export async function run(){
    let client = await connectDatabase();
    const db = client.db('devdb');

    const documents = await db
      .collection('recipes')
      .find()
      .skip(page * pageSize)
      .limit(pageSize)
      .toArray();
      
    const menuList = documents.map((doc) => {
      const { _id, ...menuData } = doc;
      return menuData;
    });

    return menuList;
}