import { client } from "../../client";

export default async function editInstructions(selectInstruction, recipeId, recipeInstruction){
    const db = client.db('devdb')
    const instructionKey = `instructions.${selectInstruction}`

    await db.collection('recipes').updateOne({
        _id: recipeId,
    }, {
        $set: {
            [instructionKey] : recipeInstruction
        }
    })
}