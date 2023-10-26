
export default async function handler(req, res) {
    const category = req.query.category;
  
    // Perform database query to fetch recipes based on category
    // Example using a hypothetical function `fetchRecipesFromDatabase(category)`
    const recipes = await fetchRecipesFromDatabase(category);
  
    res.status(200).json(recipes);
  }
  