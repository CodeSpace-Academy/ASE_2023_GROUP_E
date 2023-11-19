import { getRecipes } from '@/database/getData/getRecipesData';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { removeId } = await getRecipes('allergens', 0, 5, {createdAt: 1}, [], [], '', 0 , null )
      res.status(200).json({ allergens: removeId });
    } catch (error) {
      return res.status(417).json({ message: 'Failed to allergens' });
    }
  }
}
