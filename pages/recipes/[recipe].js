import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RecipeDetails from '@/component/Recipes/Details/RecipeDetails';

const RecipePage = () => {

  const router = useRouter()
  const [ recipe, setRecipe] = useState(null)

  useEffect(() => {
    console.log(router.query.recipe)

    fetch(`/api/recipes/recipeDetails?filter=${router.query.recipe}`)
      .then(res => res.json())
      .then(data => setRecipe(data && data.recipeDetails[0]))

      console.log(recipe)
  })

  return (
  
    <Fragment>
      {recipe && <RecipeDetails recipe={recipe}/>}
    </Fragment>
  
  )
};

export default RecipePage;