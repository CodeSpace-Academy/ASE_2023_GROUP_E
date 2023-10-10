// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://groupe:lx0hIlKaDof7KBJY@groupe.pse1kuk.mongodb.net/devdb?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// export async function run(){
//   try {
//     // Connect the client to the server    (optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     // await client.db("devdb").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");

//     const data = await client.db('devdb')
//       .collection('categories')
//       .find()
//       .toArray()
//     return data

//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }

// }
// run().catch(console.dir);


import { MongoClient } from 'mongodb'

export async function connectDatabase() {

  const client = await MongoClient.connect(`mongodb+srv://groupe:lx0hIlKaDof7KBJY@groupe.pse1kuk.mongodb.net/devdb?retryWrites=true&w=majority`)

  return client

}

const page = 1
const pageSize = 100

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