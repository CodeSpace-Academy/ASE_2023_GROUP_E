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

  // Using reduce to format ingredients for display
  const formattedIngredients = showIngredients
    ? Object.entries(recipe.ingredients || {}).reduce(
        (acc, [ingredient, amount], index) => {
          // Construct the formatted ingredient text with its amount
          acc.push(
            `${index + 1}. ${
              ingredient.charAt(0).toUpperCase() + ingredient.slice(1)
            }: ${amount}`,
          );
          return acc;
        },
        [],
      )
    : null;

  return (
    <div className={classes.ingredients}>
      {/* Header for the ingredients section */}
      <h2>Ingredients:</h2>

      {/* Conditionally render the list of ingredients based on showIngredients state */}
      {showIngredients && (
        <div>
          <ol>
            {/* Display the formatted ingredients list */}
            {formattedIngredients &&
              formattedIngredients.map((formattedIngredient) => (
                <li key={formattedIngredient}>{formattedIngredient}</li>
              ))}
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
