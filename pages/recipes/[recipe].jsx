import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RecipeDetails from '../../component/Recipes/Details/RecipeDetails';

export default function RecipePage() {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`/api/recipes/recipeDetails?filter=${router.query.recipe}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data && data.recipeDetails[0]));
  });

  return (
    <div>
      {recipe && <RecipeDetails recipe={recipe} />}
    </div>
  );
}
