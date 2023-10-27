import { client } from "@/database/client";

export default async function handler( req, res){

    if( req.method === 'POST'){
       
        const { recipeTitle, recipeInstruction } = req.body
        const db = client.db('devdb')

        try{
            await db.collection('recipes').updateOne({
                title: recipeTitle
            }, {
                $push: {
                    instructions: recipeInstruction,
                }
            })

            res.status(201).json({message: 'data has been modified'})

        }catch(error){
            res.status(417).json({ message : error})
            return
        }
    }
}
