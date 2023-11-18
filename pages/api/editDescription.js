import editDecription from "@/database/add-Edit-Data/editDescription";

export default async function handler( req, res){

    if( req.method === 'POST'){
       
        const { recipeId, recipeDescription } = req.body

        try{
            await editDecription(recipeId, recipeDescription)
            res.status(201).json({message: 'data has been modified'})

        }catch(error){
            res.status(417).json({ message : error})
            return
        }
    }
}
