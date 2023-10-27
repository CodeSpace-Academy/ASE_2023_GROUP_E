import { client } from "./client";

export default async function editDecription(recipeTitle, recipeDescription){

    const db = client.db('devdb')

    await db.collection('recipes').updateOne({
        title: recipeTitle
    }, {
        $set: {
            description: recipeDescription,
        }
    })
}