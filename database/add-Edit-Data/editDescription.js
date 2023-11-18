import { client } from "../client";

export default async function editDecription(recipeId, recipeDescription){

    const db = client.db('devdb')

    await db.collection('recipes').updateOne({
        _id: recipeId
    }, {
        $set: {
            description: recipeDescription,
        }
    })
}