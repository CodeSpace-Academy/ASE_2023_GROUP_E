import { client } from "../../client"

export default async function newInstructions(recipeId, recipeInstruction){

    const db = client.db('devdb')

    await db.collection('recipes').updateOne({
        _id: recipeId,
    }, {
        $push: {
            instructions : recipeInstruction
        }
    })
}
