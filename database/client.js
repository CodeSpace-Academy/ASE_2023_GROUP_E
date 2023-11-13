const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

export function client(){

  let client 

  try{
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      maxIdleTimeMS: 500,
    });
  }catch(error){
    console.log("failed to connect")
  }

  return client
}
