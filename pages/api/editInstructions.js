import editInstructions from "@/database/instructions/editInstruction"

export default async function handler( req, res){

    if( req.method === 'POST'){
       
        const { recipeTitle, recipeInstruction, selectInstruction } = req.body

        try{
            await editInstructions(selectInstruction, recipeTitle, recipeInstruction)
            res.status(201).json({message: 'data has been modified'})

        }catch(error){
            res.status(417).json({ message : error})
            return
        }

    }
}
