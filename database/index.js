import { MongoClient } from "mongodb";


export async function run() {
  const page = 1;
  const pageSize = 20;
  let client

  try{
    
    const uri = process.env.MONGODB_URI;
    client = new MongoClient(uri);
  }catch(error){
    console.log('failed to fetch data')
  }

  try {
    const connectClient = await client.connect();
    const db = connectClient.db('devdb');

    const documents = await db
      .collection('recipes')
      .find()
      .skip(page * pageSize)
      .limit(pageSize)
      .toArray();

    return documents;
  } catch (error) {
    console.error("Connection failed");
  } finally {
    await client.close();
  }
}
