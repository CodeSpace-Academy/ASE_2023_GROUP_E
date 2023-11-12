import { getFilteredInstructions } from "../../../../database/getData/getFilteredResults";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const selected = req.query.selected ? req.query.selected : null;

    try {
      if (selected !== null) {
        const { recipes, totalMatchingRecipes } = await getFilteredInstructions(selected);
        res.status(200).json({ recipes: [recipes, totalMatchingRecipes] });
      } else {
        res.status(400).json({ message: 'Invalid input for instructions filtering.' });
      }
    } catch (error) {
      res.status(417).json({ message: error });
    }
  }
}
