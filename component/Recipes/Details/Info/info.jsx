import { useState } from 'react';
import { TiEdit } from 'react-icons/ti';
import classes from './info.module.css';
import EditDescription from '../../../editDecription/editDescription';
import Button from '../../../Button/button';
import SingleRecipeAllergens from '../../Allergens/SingleRecipeAllergens';
import FavouritesButton from '../../../Favourites/FavouritesButton/FavouritesButton';
import StateContext from '../../../../useContext/StateContext';
import ErrorMessage from '../../../Error/ErrorMessage';
import { PrepandCookTime } from '../../../handlerTime/timeRead';

/**
 * @function Info
 * @description A component that displays information about a recipe, including category,
 * times, allergens, description, and options to edit and mark as favorite.
 * @param {Object} props - The component's properties.
 * @param {Object} props.recipe - The recipe object containing information.
 * @param {Array} props.allergens - An array of allergens.
 * @returns {React.Component} React component displaying recipe information.
 */
export default function Info({ recipe, allergens }) {
  // Access the edit state from the global context
  const { edit, setEdit } = StateContext();

  // State to handle the 'Load more' functionality for the recipe description
  const [loadmore, setLoadmore] = useState(false);

  /**
   * Contains the allergens present in this recipe
   */
  const allergenList = Object.keys(recipe.ingredients).reduce(
    (acc, ingredient) => {
      allergens.forEach((allergen) => {
        if (ingredient.toLowerCase().includes(allergen)) {
          acc.push(ingredient);
        }
      });
      return acc;
    },
    []
  );

  return (
    <div className={classes.info}>
      <div className={classes.info1}>
        {/* Display recipe category */}
        <p className={classes.category}>{recipe.category}</p>

        {/* Display preparation and cooking time */}
        <div className={classes.times}>
          <PrepandCookTime recipe={recipe} />
        </div>

        {/* Display allergens, if any */}
        <div className={classes.allergensContainer}>
          <strong>Allergens:</strong>
          {allergenList.length !== 0 ? (
            <SingleRecipeAllergens allergensList={allergenList} />
          ) : (
            <div>
              <p>No allergens</p>
            </div>
          )}
        </div>

        {/* Display favorites button */}
        <FavouritesButton recipe={recipe} />

        {/* Display recipe description with 'Load more' functionality */}
        <div className={classes.description}>
          {recipe.description ? (
            <p>
              {loadmore
                ? recipe.description
                : recipe.description.substring(0, 180)}
              {/* Button to toggle 'Load more' */}
              <button
                type="button"
                className={classes.loadmore}
                onClick={() => {
                  return setLoadmore(!loadmore);
                }}
              >
                {loadmore ? 'Load less' : 'Load more'}
              </button>
            </p>
          ) : (
            // Display error message if description failed to load
            <ErrorMessage message="Failed to load description." />
          )}
        </div>

        {/* Conditional rendering based on edit state */}
        {edit ? (
          // Display the edit description component
          <EditDescription info={recipe.description} />
        ) : (
          // Display the edit button
          <Button
            color="blue"
            text={<TiEdit fontSize="25px" />}
            click={() => {
              setEdit(!edit);
            }}
          />
        )}
      </div>
    </div>
  );
}
