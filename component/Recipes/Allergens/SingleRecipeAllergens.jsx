import React from 'react';
import SingleAllergen from './SingleAllergen';
import classes from './SingleRecipeAllergens.module.css';
/**
 * Expects an array of allergens as props and maps over the array to display individual allergen items
 * @param {array} allergenList
 * @returns
 */
const SingleRecipeAllergens = ({ allergensList }) => {
  return (
    <ul className={classes.list}>
      {allergensList.map((allergen, index) => {
        return <SingleAllergen key={index} allergen={allergen} />;
      })}
    </ul>
  );
};

export default SingleRecipeAllergens;
