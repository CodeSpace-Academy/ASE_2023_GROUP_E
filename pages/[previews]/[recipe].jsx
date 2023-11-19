import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RecipeDetails from '@/component/Recipes/Details/RecipeDetails';

const RecipePage = () => {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [allergens, setAllergens] = useState([]);
  
  useEffect(() => {
    fetch(`/api/recipes/recipeDetails?filter=${router.query.recipe}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data.recipeDetails && data.recipeDetails[0]));
  }, [recipe]);

  useEffect(() => {
    fetch('/api/recipes/allergensAndCategoryOptions?collection=allergens')
      .then((res) => res.json())
      .then((data) =>
        setAllergens(data.results && data.results[0].allergens),
      );
  }, []);

  return (
    <Fragment>
      {recipe && (
        <RecipeDetails recipe={recipe && recipe} allergens={allergens} />
      )}
    </Fragment>
  );
};

export default RecipePage;
