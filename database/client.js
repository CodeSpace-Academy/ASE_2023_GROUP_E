const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default async function connectClient() {
  try {

    return await client.connect();

  } catch(error){
    console.log('failed to connect', error)
  }
}
connectClient().catch(console.dir);
