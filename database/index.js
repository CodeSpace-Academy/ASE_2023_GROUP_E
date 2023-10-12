import { MongoClient } from 'mongodb'

export async function connectDatabase() {

  const client = await MongoClient.connect('mongodb+srv://groupe:lx0hIlKaDof7KBJY@groupe.pse1kuk.mongodb.net/devdb?retryWrites=true&w=majority')

  return client

}
const page = 0; 


export async function run(pageSizing){
    let client = await connectDatabase();
    const db = client.db('devdb');

    const documents = await db
      .collection('recipes')
      .find()
      .skip(page * pageSizing)
      .limit(pageSizing)
      .toArray();
      
    const menuList = documents.map((doc) => {
      const { _id, ...menuData } = doc;
      return menuData;
    });

    return menuList;
}

// export async function loadmore(pageSizing){
//   let client = await connectDatabase();
//   const db = client.db('devdb');

//   const documents = await db
//     .collection('recipes')
//     .find()
//     .skip(page * pageSizing)
//     .limit(pageSizing)
//     .toArray();
    
//   const menuList = documents.map((doc) => {
//     const { _id, ...menuData } = doc;
//     return menuData;
//   });

//   return menuList;
// }