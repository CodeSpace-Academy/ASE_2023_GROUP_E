import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import SingleAllergen from './SingleAllergen';
import classes from './SingleRecipeAllergens.module.css';
/**
 * @module SingleRecipeAllergens
 * @description A component that displays a list of allergens for a single recipe.
 * @param {Object} props - Component's properties.
 * @param {Array} props.allergensList - An array of allergens to be displayed.
 * @returns {React.Component} React component displaying a list of allergens.
 */
export default function SingleRecipeAllergens({ allergensList }) {
  // Render an unordered list of allergens
  return (
    <ul className={classes.list}>
      {/* Map through the allergensList array and render a SingleAllergen component for each allergen */}
      {allergensList.map((allergen) => {
        // Assign a unique key using uuidv4 to each allergen item
        return <SingleAllergen key={uuidv4()} allergen={allergen} />;
      })}
    </ul>
  );
}
