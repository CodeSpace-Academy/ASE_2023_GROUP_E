import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RecipeDetails from '@/component/Recipes/Details/RecipeDetails';

const RecipePage = () => {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [allergens, setAllergens] = useState([]);
  
  useEffect(() => {
    fetch(`/api/getData?filter=${router.query.recipe}&collection=recipes`)
      .then((res) => res.json())
      .then((data) => setRecipe(data.recipes && data.recipes[0]));
  }, [recipe]);

  useEffect(() => {
    fetch('/api/getData?collection=allergens')
      .then((res) => res.json())
      .then((data) =>
        setAllergens(data.recipes && data.recipes[0].allergens),
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
