import {getRecipe} from '../../database/getData/getRecipesData';

// eslint-disable-next-line consistent-return
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { collection } = req.query;
    const project = req.query.project || '';
    const filter = req.query.filter || '';

    try {
      const { recipes } = await getRecipe(collection, filter, project);
      res.status(200).json({ results: recipes });
    } catch (error) {
      return res.status(417).json({ message: 'failed to load Recipes' });
    }
  }
}
