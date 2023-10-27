import { client } from "../client"

export default async  function getRecipes(skip, limit){

    const db = client.db('devdb')
    const results = await db.collection('recipes')
        .find()
        .skip(skip)
        .limit(limit)
        .toArray()

        return results
}