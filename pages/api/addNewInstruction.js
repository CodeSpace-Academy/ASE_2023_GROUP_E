import run from "@/database/updateData";


export default async function handler( req, res){

    if( req.method === 'POST'){
       
        const { recipeTitle, recipeInstruction } = req.body
        const client = await run()
        const db = client.db('devdb')

        if(recipeInstruction.length  === 0) {
            res.status(417).json({ message: 'bad request' })
            client.close()
            return
        }

        try{
            await db.collection('recipes').updateOne({
                title: recipeTitle,
            }, {
                $push: {
                    instructions : recipeInstruction
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
