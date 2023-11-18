import editInstructions from "@/database/add-Edit-Data/instructions/editInstruction"

export default async function handler( req, res){

    if( req.method === 'POST'){
       
        const { recipeId, recipeInstruction, selectInstruction } = req.body

        try{
            await editInstructions(selectInstruction, recipeId, recipeInstruction)
            res.status(201).json({message: 'data has been modified'})

        }catch(error){
            res.status(417).json({ message : error})
            return
        }

    }
}
