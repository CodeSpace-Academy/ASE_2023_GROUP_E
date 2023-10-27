import { client } from "../client"


export default async function getRecipeDetails(filter){

    const db = client.db('devdb')
    const results = await db.collection('recipes')
        .find(filter)
        .toArray()
        
        return results
}
