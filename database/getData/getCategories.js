import client from "../client"


export async function getCategories(){


    const db = client().db('devdb')
    const results = await db.collection('categories').find().toArray()


    const removeId = results.map((doc) => {
        const { _id, ...categories } = doc;
        return categories;
      });


    return removeId
}
