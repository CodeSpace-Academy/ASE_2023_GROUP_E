import { client } from './client';



export async function fetchCategoriesFromDatabase() {

  try {
    await client.connect();

    const db = client.db('devdb');
    const categoriesCollection = db.collection('categories');
    const categories = await categoriesCollection.find().toArray();
   
    console.log(categoriesCollection)
    return {
      categories,
    };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return {
      categories: [],
      error: 'Error connecting to the database',
    };
  } finally {
    await client.close();
  }
}
