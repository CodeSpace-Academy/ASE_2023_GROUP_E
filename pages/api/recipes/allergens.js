import { fetchAllergensFromDatabase } from '@/database/allergensData';
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const results = await fetchAllergensFromDatabase();
      res.status(200).json({ allergens: results });
    } catch (error) {
      return res.status(417).json({ message: 'Failed to allergens' });
    }
  }
}
