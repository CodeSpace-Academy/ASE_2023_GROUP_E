import { client } from "./client"


export default async function getFilteredRecipes(skip,filter){


 Database/getFilteredRecipes.js


    const db = client.db('devdb')
    const results = await db.collection('recipes')
        .find(filter)
        .skip(skip)
        .limit(50)
        .toArray()


        return results
}
