import getFilteredRecipes from "@/database/getFiltedRecipes";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { skip, filter } = req.body;
    const recipes = await getFilteredRecipes(skip, filter);
    res.status(200).json(recipes);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}


