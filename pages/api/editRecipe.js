import editRecipe from '../../database/editData/editRecipe';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      recipeId,
      recipeValue,
      key,
      action,
    } = req.body;

    try {
      await editRecipe(action, key, recipeId, recipeValue);
      res.status(201).json({ message: 'data has been modified' });
    } catch (error) {
      res.status(417).json({ message: error });
    }
  }
}
