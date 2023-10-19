// pages/[preview]/[recipe]

import React from 'react';
import { run } from '@/database';
import RecipeDetails from '@/component/Recipes/Details/RecipeDetails';

const RecipePage = ({ recipe }) => {
  return <RecipeDetails recipe={recipe} />;
};

export async function getServerSideProps({ params }) {
  const { preview, recipe } = params;

  // Fetch the recipe details based on preview and recipe params
  const {documents} = await run(parseInt(preview));
  
  const selectedRecipe = documents.find((r) => r.title === recipe);

  return {
    props: {
      recipe: selectedRecipe || null, // Pass the selected recipe as props
    },
  };
}

export default RecipePage;
