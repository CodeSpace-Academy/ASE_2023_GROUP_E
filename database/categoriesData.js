import { client } from './client';

<<<<<<< HEAD
export async function fetchCategoriesFromDatabase() {
  
 
=======

export async function fetchCategoriesFromDatabase() {
 
 

>>>>>>> 29e4f0bc7ad52b8ebbf947520671b513fddf53e0

  try {
    await client.connect();

<<<<<<< HEAD
    const db = client.db('devdb');
    const categoriesCollection = db.collection('categories');
    const categories = await categoriesCollection.find().toArray();
    
    console.log(categoriesCollection)

=======

    const db = client.db('devdb');
    const categoriesCollection = db.collection('categories');
    const categories = await categoriesCollection.find().toArray();
   
    console.log(categoriesCollection)


>>>>>>> 29e4f0bc7ad52b8ebbf947520671b513fddf53e0
    return {
      categories,
    };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return {
      categories: [],
<<<<<<< HEAD
=======

>>>>>>> 29e4f0bc7ad52b8ebbf947520671b513fddf53e0
      error: 'Error connecting to the database',
    };
  } finally {
    await client.close();
  }
}
