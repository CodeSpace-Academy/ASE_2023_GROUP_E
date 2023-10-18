// pages/[preview]/[recipe]

import React from 'react';
import { run } from '@/database';
import RecipeDetails from '@/component/Recipes/Details/RecipeDetails';
import { fetchAllergensFromDatabase } from '@/database/allergensData';
const RecipePage = ({ recipe, allergens }) => {
  console.log(allergens);
  return <RecipeDetails recipe={recipe} allergens={allergens} />;
};

export async function getServerSideProps({ params }) {
  const { preview, recipe } = params;

  // Fetch the recipe details based on preview and recipe params
  const { documents } = await run(parseInt(preview));
  const { allergens } = await fetchAllergensFromDatabase();
  const selectedRecipe = documents.find((r) => r.title === recipe);

  // // Convert the _id fields of allergens to strings
  // const allergens = allergensDocuments.map((allergen) => ({
  //   ...allergen,
  //   _id: allergen._id.toString(),
  // }));
  return {
    props: {
      recipe: selectedRecipe || null, // Pass the selected recipe as props
      allergens: allergens,
    },
  };
}

export default RecipePage;
