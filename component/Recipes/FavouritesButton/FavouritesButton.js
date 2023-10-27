import React, { useState, useEffect } from 'react';
import classes from './FavouritesButton.module.css';

/**
 * When clicked can add or remove the recipe provided from the favourite recipes list.
 * @param {object} recipe
 * @returns
 */
const FavouritesButton = ({ recipe }) => {
  const [favouritesList, setFavouritesList] = useState(
    JSON.parse(localStorage.getItem('favouriteRecipesList')) || []
  );
  /**
   * Returns the recipe if it is already in the favouritesList
   */
  const recipeIsInFavouritesList = favouritesList.find((singleRecipe) => {
    return singleRecipe._id === recipe._id;
  });

  //set the favouriteRecipesList in local storage each time the favouritesList is updated
  useEffect(() => {
    localStorage.setItem(
      'favouriteRecipesList',
      JSON.stringify(favouritesList)
    );
  }, [favouritesList]);
  /**
   * Adds or removes the recipe from the favouritesList based on whether
   * it is currently present in the list or not.
   */
  const toggleIsInFavourites = () => {
    if (!recipeIsInFavouritesList) {
      setFavouritesList((prevFavourites) => [...prevFavourites, recipe]);
      console.log(recipe.title, 'is not in the list. Adding it');
    } else {
      setFavouritesList((prevFavourites) =>
        prevFavourites.filter((singleRecipe) => {
          return singleRecipe._id !== recipe._id;
        })
      );
      console.log(recipe.title, 'is already in the list');
    }
  };
  return (
    <div>
      <button
        onClick={toggleIsInFavourites}
        className={
          recipeIsInFavouritesList
            ? `${classes.isFavourite} ${classes.favButton}`
            : classes.favButton
        }
      >
        {recipeIsInFavouritesList
          ? 'Remove from favourites'
          : 'Add to favourites'}
      </button>
    </div>
  );
};

export default FavouritesButton;
