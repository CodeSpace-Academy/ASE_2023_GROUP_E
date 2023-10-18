import React from 'react';
import SingleAllergen from './SingleAllergen';
import classes from './SingleRecipeAllergens.module.css';
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
