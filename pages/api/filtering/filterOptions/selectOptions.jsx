import { getFilteredObjects } from "@/database/getData/getFilteredResults";

export default async function handler(req, res){
  if (req.method === "GET") {

    const object = req.query.object || ''
    try {
      const results = await getFilteredObjects({[object]: 1, _id: 0 })
      res.status(200).json({ recipes: results })

    } catch (error) {
       return res.status(417).json({ message: 'failed to load Recipes'})
    }
  }
}
