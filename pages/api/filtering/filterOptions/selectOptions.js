import { getRecipes } from "@/database/getData/getRecipesData";

export default async function handler(req, res){
  if (req.method === "GET") {

    const project = req.query.project || ''
    const filter = req.query.filter || '';

    try {
      const { recipes } = await getRecipes('recipes', 0, 5, {createdAt: 1}, [], [], '', 0 , null, filter, project )
      res.status(200).json({ recipes: recipes })

    } catch (error) {
       return res.status(417).json({ message: 'failed to load Recipes'})
    }
  }
}
