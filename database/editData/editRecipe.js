import { client } from "../client";

export default async function editRecipe(stage, key, recipeId, recipeValue){
    const db = client.db('devdb')

    await db.collection('recipes').updateOne({
        _id: recipeId,
    }, {
        [stage]: {
            [key] : recipeValue
        }
    })
}