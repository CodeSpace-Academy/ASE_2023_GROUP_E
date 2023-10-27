import editDecription from "@/database/editDescription";

export default async function handler( req, res){

    if( req.method === 'POST'){
       
        const { recipeTitle, recipeDescription } = req.body

        try{
            await editDecription(recipeTitle, recipeDescription)
            res.status(201).json({message: 'data has been modified'})

        }catch(error){
            res.status(417).json({ message : error})
            return
        }
    }
}
