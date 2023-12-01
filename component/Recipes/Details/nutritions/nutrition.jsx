import { useState } from 'react';
import classes from './nutrition.module.css';
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';

/**
 * @function Nutritions
 * @description A component that displays the nutrition information for a recipe, with an expand/collapse button.
 * @param {Object} props - The component's properties.
 * @param {Object} props.recipe - The recipe object containing nutrition information.
 * @returns {React.Component} React component displaying recipe nutrition information.
 */
export default function Nutritions({ recipe }) {
  // State to manage the visibility of nutrition information (expanded or collapsed)
  const [showNutrition, setShowNutrition] = useState(false);

  const formattedNutrition = showNutrition
    ? Object.entries(recipe.nutrition || {}).reduce(
        (acc, [nutrient, value]) => {
          const capitalNutrient =
            nutrient.charAt(0).toUpperCase() + nutrient.slice(1);
          acc.push(`${capitalNutrient}: ${value}`);
          return acc;
        },
        [],
      )
    : null;

  return (
    <div className={classes.nutrition}>
      {/* Header for the nutrition information section */}
      <h2>Nutrition:</h2>

      {/* Conditionally render the nutrition information based on showNutrition state */}
      {showNutrition && (
        <div>
          <ul>
            {/* Display the formatted nutrition information list */}
            {formattedNutrition &&
              formattedNutrition.map((formattedNutrient) => (
                <li key={formattedNutrient}>{formattedNutrient}</li>
              ))}
          </ul>
        </div>
      )}

      {/* Button to toggle the visibility of nutrition information */}
      <button onClick={() => setShowNutrition(!showNutrition)}>
        {/* Display expand/collapse icon based on showNutrition state */}
        {showNutrition ? (
          <MdOutlineExpandLess fontSize={'20px'} />
        ) : (
          <MdOutlineExpandMore fontSize={'20px'} />
        )}
      </button>
    </div>
  );
}
