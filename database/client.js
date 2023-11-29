const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

/**
 * Incase we get a new team make to join us on this project
 * When the new member downloads this project from github
 * It will not be downloaded with the .env file, so this will 
 * cause the project not to run, so we then alert our new member
 * what the reason is.
 */
if (!uri) {
  throw new Error(".env file is missing or has no values");
}

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxIdleTimeMS: 500,
});

