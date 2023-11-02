import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RecipeDetails from '@/component/Recipes/Details/RecipeDetails';
import LoadingSpinner from '@/component/ui/loadingSpinner/LoadingSpinner';
const RecipePage = () => {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`/api/recipes/recipeDetails?filter=${router.query.recipe}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data && data.recipeDetails[0]));
  }, []);

  return (
    <Fragment>
      {recipe ? <RecipeDetails recipe={recipe} /> : <LoadingSpinner />}
    </Fragment>
  );
};

export default RecipePage;