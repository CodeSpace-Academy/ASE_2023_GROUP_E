import editRecipe from "@/database/editData/editRecipe"

export default async function handler( req, res){

    if( req.method === 'POST'){
       
        const { recipeId, recipeValue, key, stage } = req.body

        try{
            await editRecipe(stage ,key, recipeId, recipeValue)
            res.status(201).json({message: 'data has been modified'})

        }catch(error){
            res.status(417).json({ message : error})
            return
        }

    }
}
