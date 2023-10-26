import { newInstructions } from "@/component/editInstructions/editInstructions";

export default async function handler( req, res){

    if( req.method === 'POST'){
       
        const { recipeTitle, recipeInstruction } = req.body

        if(recipeInstruction.length  === 0) {
            res.status(417).json({ message: 'bad request' })
        }

        try{
            const results = await newInstructions(recipeTitle, recipeInstruction)
            res.status(201).json({message: 'data has been modified'})
            return results

        }catch(error){
            res.status(417).json({ message : error})
            return
        }
    }
}
