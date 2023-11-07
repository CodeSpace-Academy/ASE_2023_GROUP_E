import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RecipeDetails from '@/component/Recipes/Details/RecipeDetails';
import LoadingSpinner from '@/component/ui/loadingSpinner/LoadingSpinner';
const RecipePage = () => {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [allergens, setAllergens] = useState([]);
  useEffect(() => {
    fetch(`/api/recipes/recipeDetails?filter=${router.query.recipe}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data.recipeDetails && data.recipeDetails[0]));
  });
  useEffect(() => {
    fetch('/api/recipes/allergens')
      .then((res) => res.json())
      .then((data) =>
        setAllergens(data.allergens && data.allergens[0].allergens),
      );
  }, []);

  return (
    <Fragment>
      {recipe && <RecipeDetails recipe={recipe && recipe} allergens={allergens}/>}
    </Fragment>
  );
};

export default RecipePage;
