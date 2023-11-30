// Import React and necessary components/icons/styles
import { useState } from 'react';
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';
import classes from './ingredients.module.css';

/**
 * @function Ingredients
 * @description A component that displays the list of ingredients for a recipe, with an expand/collapse button.
 * @param {Object} props - The component's properties.
 * @param {Object} props.recipe - The recipe object containing information.
 * @returns {React.Component} React component displaying recipe ingredients.
 */
export default function Ingredients({ recipe }) {
  // State to manage the visibility of ingredients (expanded or collapsed)
  const [showIngredients, setShowIngredients] = useState(false);

  return (
    <div className={classes.ingredients}>
      {/* Header for the ingredients section */}
      <h2>Ingredients:</h2>

      {/* Conditionally render the list of ingredients based on showIngredients state */}
      {showIngredients && (
        <div>
          <ol>
            {/* Map through the ingredients object and display each ingredient with its amount */}
            {recipe.ingredients &&
              Object.entries(recipe.ingredients).map(
                ([ingredient, amount], index) => (
                  <li key={ingredient}>{`${index +1}. ${ingredient.slice(0,1).toUpperCase() + ingredient.slice(1)}: ${amount}`}</li>
                )
              )}
          </ol>
        </div>
      )}

      {/* Button to toggle the visibility of ingredients */}
      <button onClick={() => setShowIngredients(!showIngredients)}>
        {/* Display expand/collapse icon based on showIngredients state */}
        {showIngredients ? (
          <MdOutlineExpandLess fontSize={'20px'} />
        ) : (
          <MdOutlineExpandMore fontSize={'20px'} />
        )}
      </button>
    </div>
  );
}
