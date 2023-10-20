import run from "@/database/updateData";


export default async function handler( req, res){


    if( req.method === 'POST'){
       
        const { recipeTitle, recipeDescription, recipeInstruction } = req.body
       
        let client = await run()
       


        const db = client.db('devdb')


        try{
            await db.collection('recipes').updateOne({
                title: recipeTitle
            }, {
                $set: {
                    description: recipeDescription,
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
