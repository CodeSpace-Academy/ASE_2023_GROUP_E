import Recipe from '../../../models/Recipe';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const categories = await Recipe.distinct('category'); // Assuming 'category' is the field in your Recipe model
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
