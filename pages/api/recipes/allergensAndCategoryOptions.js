import { getRecipes } from '@/database/getData/getRecipesData';

export default async function handler(req, res) {
  if (req.method === 'GET') {

    const collection = req.query.collection
    try {
      const { removeId } = await getRecipes(collection, 0, 5, {createdAt: 1}, [], [], '', 0 , null, '', '' )
      res.status(200).json({ results: removeId });
    } catch (error) {
      return res.status(417).json({ message: `Failed to get ${collection || 'data'}` });
    }
  }
}
