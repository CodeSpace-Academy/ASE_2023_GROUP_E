import { getRecipes } from "@/database/getData/getRecipesData";

export default async function handler(req, res){

    if(req.method === "GET"){

        const filter = req.query.filter || '';

        try{
            const {recipes} = await getRecipes('recipes', 0, 2, {title: 1}, [], [], '', 0,'$or', filter, '')
            res.status(200).json({ recipeDetails : recipes })

        }catch(error){
            return res.status(417).json({ message: 'failed to load Recipes'})
        }
    }
}
