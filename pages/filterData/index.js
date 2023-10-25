// pages/filterData/index.js

import React, { useEffect, useState } from 'react';
import { run } from '@/database';
import IngredientsList from '@/component/Filter/ingredients';

export default function IngredientList({ documents }) {
  const [uniqueIngredient, setUniqueIngredient] = useState([]);
 
  useEffect(() => {
    if (documents) {
      const  AllIngredients = documents.reduce((ingredients, recipe) => {
        return ingredients.concat(recipe.ingredients);
      }, []);

      const uniqueIngredient = [...new Set(AllIngredients)]; // Remove duplicates
      setUniqueIngredient(uniqueIngredient);
    }
  }, [documents]);

  return (
    <div>
      <IngredientsList recipes={uniqueIngredient} />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const {documents} = await run();

    return {
      props: {
        documents,
      },
    };
  } catch (error) {
    return {
      props: {
        error: 'Failed to fetch data. Please check your network connection.',
      },
    };
  }
}
