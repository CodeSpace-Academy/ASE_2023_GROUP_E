import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RecipeDetails from '../../component/Recipes/Details/RecipeDetails';

export default function RecipePage() {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [allergens, setAllergens] = useState([]);
  useEffect(() => {
    fetch(`/api/recipes/recipeDetails?filter=${router.query.recipe}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return setRecipe(data.recipeDetails && data.recipeDetails[0]);
      });
  });
  useEffect(() => {
    fetch('/api/recipes/allergens')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return setAllergens(data.allergens && data.allergens[0].allergens);
      });
  }, []);

  return (
    <div>
      {recipe && (
        <RecipeDetails recipe={recipe && recipe} allergens={allergens} />
      )}
    </div>
  );
}
