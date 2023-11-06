import getRecipes from "@/database/getData/getRecipes";

export default async function handler(req, res){


    if(req.method === "GET"){

        const skip = parseInt(req.query.skip) || 0;
        const limit =  parseInt(req.query.limit) || 0;
        const sort = req.query.sort || ''
        const sortIn = req.query.sortIn || ''

        try{
            const {recipes} = await getRecipes({}, skip, limit, {[sort]: sortIn})
            res.status(200).json({ recipes: recipes })

        }catch(error){
            return res.status(417).json({ message: 'failed to load Recipes'})
        }
    }
}