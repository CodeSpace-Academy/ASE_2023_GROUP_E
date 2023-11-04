import { getFilteredTags } from "@/database/getData/getFilteredResults";

export default async function handler(req, res){
  if (req.method === "GET") {

    try {
      const results = await getFilteredTags()
      res.status(200).json({ recipes: results })

    } catch (error) {
       return res.status(417).json({ message: 'failed to load Recipes'})
    }
  }
}
