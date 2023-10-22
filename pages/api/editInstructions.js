import run from "@/database/updateData";


export default async function handler( req, res){


    if( req.method === 'POST'){
       
        const { recipeTitle, recipeInstruction, selectInstruction } = req.body
       
        let client = await run()
       


        const db = client.db('devdb')

        const instructionKey = `instructions.${selectInstruction}`


        try{
            await db.collection('recipes').updateOne({
                title: recipeTitle,
            }, {
                $set: {
                    [instructionKey] : recipeInstruction
                }
            })


            res.status(201).json({message: 'data has been modified'})
            client.close()


        }catch(error){
            client.close()
            res.status(417).json({ message : error})
            return
        }


    }
}
