import getRecipes from "@/database/getRecipes";

export default async function handler(req, res){


    if(req.method === "GET"){

  

        const skip = parseInt(req.query.skip) || 0; 

        try{

            const results = await getRecipes(skip)
            res.status(200).json({ recipes: results })

        }catch(error){
            return res.status(417).json({ message: 'failed to load Recipes'})
        }
    }
}