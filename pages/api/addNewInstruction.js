import newInstructions from "@/database/add-Edit-Data/instructions/newInstruction"


export default async function handler( req, res){

    if( req.method === 'POST'){
       
        const { recipeId, recipeInstruction } = req.body      

        try{
            await newInstructions(recipeId, recipeInstruction)
            res.status(201).json({message: 'instruction added'})

        }catch(error){
            res.status(417).json({ message : error})
            return
        }
    }
}
