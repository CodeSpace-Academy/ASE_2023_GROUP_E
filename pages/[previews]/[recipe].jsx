import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RecipeDetails from '../../component/Recipes/Details/RecipeDetails';

/**
 * RecipePage component renders the details of a specific recipe.
 * It fetches data based on the recipe ID from the URL query parameters.
 * @returns {React.ReactElement} - The RecipePage component
 */
function RecipePage() {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [allergens, setAllergens] = useState([]);

  /**
   * Fetches recipe details based on the recipe ID from the URL query parameters.
   */
  useEffect(() => {
    fetch(`/api/getData?filter=${router.query.recipe}&collection=recipes`)
      .then((res) => res.json())
      .then((data) => setRecipe(data.results && data.results[0]));
  });

  /**
   * Fetches a list of allergens.
   */
  useEffect(() => {
    fetch('/api/getData?collection=allergens')
      .then((res) => res.json())
      .then((data) => setAllergens(data.results && data.results[0].allergens));
  }, []);

  /**
   * Renders the RecipeDetails component with the fetched recipe and allergens.
   * @returns {React.ReactElement} - The RecipeDetails component with recipe and allergens as props.
   */
  return (
    <div>
      {recipe && (
        <RecipeDetails recipe={recipe} allergens={allergens} />
      )}
    </div>
  );
}

export default RecipePage;
