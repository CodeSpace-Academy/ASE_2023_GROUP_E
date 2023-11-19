import { client } from "../../client";

export default async function editRecipe(key, recipeId, recipeValue){
    const db = client.db('devdb')

    await db.collection('recipes').updateOne({
        _id: recipeId,
    }, {
        $set: {
            [key] : recipeValue
        }
    })
}