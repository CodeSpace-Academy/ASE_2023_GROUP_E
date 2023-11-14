import client from "../../client";

export default async function editInstructions(selectInstruction, recipeTitle, recipeInstruction){
    const db = client().db('devdb')
    const instructionKey = `instructions.${selectInstruction}`

    await db.collection('recipes').updateOne({
        title: recipeTitle,
    }, {
        $set: {
            [instructionKey] : recipeInstruction
        }
    })
}