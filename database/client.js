const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

export function client(){

  if (!uri) {
    throw new Error(".env file is missing or has no values");
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    maxIdleTimeMS: 500,
  });

  return client
}
