export default async function handler(req, res) {
  if (req.method === 'POST') {
    const db = client.db('devdb');
    try {
      await db.collection('favourites').insertOne({ title: 'The Favourite' });
      res.status(201).json({ message: 'Favourite added!!' });
      client.close();
    } catch (error) {
      client.close();
      res.status(417).json({ message: 'Error!' });
      return;
    }
  }
}
