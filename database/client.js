const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

if(!uri){
  throw new console.error('Env not found');
}

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxIdleTimeMS: 500,
});
