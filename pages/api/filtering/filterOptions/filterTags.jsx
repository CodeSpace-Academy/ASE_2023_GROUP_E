import getFilteredResults from "@/database/getData/getFilteredResults"


export default async function handler(req, res){

  if(req.method === 'GET'){

    const tags = req.query.tags ? req.query.tags.split(',') : [];
 
    try{
      const results = await getFilteredResults(tags)
      res.status(200).json({ recipes : results})
    } catch (error) {
      res.status(417).json({ message : error})
    }
  }
}