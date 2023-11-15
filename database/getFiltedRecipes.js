import { client } from "./client"

export default async function getFilteredRecipes(skip,filter){

    const db = client().db('devdb')
    const results = await db.collection('recipes')
        .find(filter)
        .skip(skip)
        .limit(100)
        .toArray()

        return results,
}