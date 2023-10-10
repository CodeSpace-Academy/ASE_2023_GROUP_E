import { MongoClient } from 'mongodb'

export async function connectDatabase() {

  const client = await MongoClient.connect('mongodb+srv://groupe:lx0hIlKaDof7KBJY@groupe.pse1kuk.mongodb.net/devdb?retryWrites=true&w=majority')

  return client

}

const page = 0;
const pageSize = 10; 


export async function Run(){
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
