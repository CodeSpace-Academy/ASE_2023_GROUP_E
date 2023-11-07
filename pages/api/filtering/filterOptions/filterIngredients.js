import {getFilteredIngredients} from "@/database/getData/getFilteredResults"
export default async function handler(req, res){

  if(req.method === 'GET'){

    const selected = req.query.selected ? req.query.selected.split(',') : [];
    const andOr = req.query.andOr
 
    try{
      const {recipes, totalMatchingRecipes} = await getFilteredIngredients(selected, andOr)
      res.status(200).json({ recipes : [recipes, totalMatchingRecipes]})
    } catch (error) {
      res.status(417).json({ message : error})
    }
  }
}