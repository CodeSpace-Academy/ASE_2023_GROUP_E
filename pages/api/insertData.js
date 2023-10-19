import run from "@/database/updateData";

export default async function handler( req, res){

    if( req.method === 'POST'){
        
        const { recipeTitle, recipeDescription } = req.body
      

        
            let client = await run()
        

        const db = client.db()

        try{
            await db.collection('recipes').updateOne({
                title: recipeTitle
            }, {
                $push: {
                    description: recipeDescription
                }
            })


        }catch(error){
            client.close()
            res.status(417).json({ message : error})
            return
        }

        client.close()
        res.status(201).json({message: 'data has been modified'})

    }
}