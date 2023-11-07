import getFilteredTags from "@/database/getData/getFilteredResults"


export default async function handler(req, res){

  if(req.method === 'GET'){

    const selected = req.query.selected ? req.query.selected.split(',') : [];
 
    try{
      const {documents,totalMatchingRecipes} = await getFilteredTags(selected)
      res.status(200).json({ recipes : [documents, totalMatchingRecipes]})
    } catch (error) {
      res.status(417).json({ message : error})
    }
  }
}