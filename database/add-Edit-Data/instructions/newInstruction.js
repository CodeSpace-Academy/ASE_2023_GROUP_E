import client from "../../client"

export default async function newInstructions(recipeTitle, recipeInstruction){

    const db = client().db('devdb')

    await db.collection('recipes').updateOne({
        title: recipeTitle,
    }, {
        $push: {
            instructions : recipeInstruction
        }
    })
}
