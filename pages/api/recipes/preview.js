import getRecipes from "@/database/getData/getRecipes";

export default async function handler(req, res){


    if(req.method === "GET"){

        const skip = parseInt(req.query.skip) || 0;
        const limit =  parseInt(req.query.limit) || 0;

        try{
            const results = await getRecipes({}, skip, limit)
            res.status(200).json({ recipes: results })

        }catch(error){
            return res.status(417).json({ message: 'failed to load Recipes'})
        }
    }
}