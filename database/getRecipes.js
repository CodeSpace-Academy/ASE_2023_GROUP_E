import { client } from "./client"

export default async  function getRecipes(skip){

    const db = client.db('devdb')
    const results = await db.collection('recipes')
        .find()
        .skip(skip)
        .limit(50)
        .toArray()

        return results
}