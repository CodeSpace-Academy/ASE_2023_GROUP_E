
import Recipe from '../../../models/Recipe';

const uri = process.env.MONGODB_URI

export default async function handler(req, res) {
  const { category } = req.query;

  if (req.method === 'GET') {
    try {
      const recipes = await Recipe.find({ category });
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
