import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import SingleAllergen from './SingleAllergen';
import classes from './SingleRecipeAllergens.module.css';
/**
 * Expects an array of allergens as props and maps over the array
 * to display individual allergen items
 * @param {array} allergenList
 * @returns
 */
export default function SingleRecipeAllergens({ allergensList }) {
  return (
    <ul className={classes.list}>
      {allergensList.map((allergen) => {
        return <SingleAllergen key={uuidv4()} allergen={allergen} />;
      })}
    </ul>
  );
}
