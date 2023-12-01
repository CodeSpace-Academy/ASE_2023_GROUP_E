import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RecipeDetails from '../../component/Recipes/Details/RecipeDetails';

function RecipePage() {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    fetch(`/api/getData?filter=${router.query.recipe}&collection=recipes`)
      .then((res) => res.json())
      .then((data) => setRecipe(data.results && data.results[0]));
  });

  useEffect(() => {
    fetch('/api/getData?collection=allergens')
      .then((res) => res.json())
      .then((data) => setAllergens(data.results && data.results[0].allergens));
  }, []);

  return (
    <div>
      {recipe && (
        <RecipeDetails recipe={recipe && recipe} allergens={allergens} />
      )}
    </div>
  );
}

export default RecipePage;
