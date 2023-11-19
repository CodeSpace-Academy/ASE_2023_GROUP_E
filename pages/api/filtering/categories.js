import { getRecipes } from "@/database/getData/getRecipesData";

export default async function handler(req, res){

    try{
        const { removeId } = await getRecipes('categories', 0, 5, {createdAt: 1}, [], [], '', 0 , null )
        res.status(200).json({ categories: removeId})
    }catch(error){
        res.status(417).json({ message: 'failed to load categories'})
    }
}
