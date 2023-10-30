import getRecipes from "@/database/getData/getRecipes";


export default async function handler(req, res){

    if(req.method === "GET"){

        const filter = req.query.filter || '';

        

        try{
            const results = await getRecipes({title : filter}, 0 )
            res.status(200).json({ recipeDetails : results })

        }catch(error){
            return res.status(417).json({ message: 'failed to load Recipes'})
        }
    }
}
