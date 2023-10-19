import { run } from '@/database';
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const recipes = await run(400);
  }
  res.status(200).json({ name: 'John Doe' });
}
