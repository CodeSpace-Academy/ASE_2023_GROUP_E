import getRecipeDetails from "@/database/getRecipeDetails";

export default async function handler(req, res){


    if(req.method === "GET"){

        const filter = req.query.filter || ''; 

        try{
            const results = await getRecipeDetails(filter)
            res.status(200).json({ recipeDetails : results })

        }catch(error){
            return res.status(417).json({ message: 'failed to load Recipes'})
        }
    }
}