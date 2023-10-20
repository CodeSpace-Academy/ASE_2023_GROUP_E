import { MongoClient } from 'mongodb';


export default async function run() {
 
  let client = process.env.MONGODB_URI;
  client = await MongoClient.connect(client)


  if(!client){
    console.error('failed  attempt')
  }
  return client


}
