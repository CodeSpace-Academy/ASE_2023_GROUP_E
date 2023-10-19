// pages/[preview]/[recipe]

import React from 'react';
import { run } from '@/database';
import RecipeDetails from '@/component/Recipes/Details/RecipeDetails';
import { fetchAllergensFromDatabase } from '@/database/allergensData';
const RecipePage = ({ recipe, allergens }) => {
  return <RecipeDetails recipe={recipe} allergens={allergens} />;
};

export async function getServerSideProps({ params }) {
  const { preview, recipe } = params;

  // Fetch the recipe details based on preview and recipe params
  const { documents } = await run(parseInt(preview));
  const selectedRecipe = documents.find((r) => r.title === recipe);
  // Fetch allergens from the database
  const { allergens } = await fetchAllergensFromDatabase();

  return {
    props: {
      recipe: selectedRecipe || null, // Pass the selected recipe as props
      allergens: allergens[0].allergens, //pass the allergens array as props
    },
  };
}

export default RecipePage;
