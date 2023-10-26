// import{client} from '.index'

// export async function fetchCategories() {


//   try {
//     // const uri = process.env.MONGODB_URI;

//     if (!uri) {
//       console.error('failed to connect');
//       return {
//         categories: [],
//       };
//     }

 

//     // await client.connect();
//     // const db = client.db('devdb');

//     const categoriesCollection = db.collection('categories');
//     const categoriesDocuments = await categoriesCollection.find({}).toArray();
//     console.log('categoriesDocuments:', categoriesDocuments);
//     const categories = categoriesDocuments.map((doc) => doc.name);
//     console.log('categories:', categories);

//     return {
//       categories,
//     };
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//     return {
//       categories: [],
//     };
//   } finally {
//     if (client) {
//       await client.close();
//     }
//   }
// }
