import React, { useState, useEffect } from 'react';
import classes from './FavouritesButton.module.css';
import StateContext from '@/useContext/StateContext';
import FavouritesModal from '../FavouritesModal/FavouritesModal';

/**
 * When clicked can add or remove the recipe provided from the favourite recipes list.
 * @param {object} recipe
 * @returns
 */
const FavouritesButton = ({ recipe }) => {
  // Global state list of favourite recipes
  const { favouritesList, setFavouritesList } = StateContext();
  /**
   * Returns the recipe if it is already in the favouritesList
   */
  const recipeIsInFavouritesList = favouritesList.find((singleRecipe) => {
    return singleRecipe._id === recipe._id;
  });
  //Modal open state
  const [open, setOpen] = React.useState(false);
  /**
   * Opens the modal
   */
  const handleClickOpen = () => {
    setOpen(true);
    console.log('modal open');
  };
  /**
   * Closes the modal
   */
  const handleClose = () => {
    setOpen(false);
    console.log('modal close');
  };

  //set the favouriteRecipesList in local storage each time the favouritesList is updated
  useEffect(() => {
    localStorage.setItem(
      'favouriteRecipesList',
      JSON.stringify(favouritesList)
    );
  }, [favouritesList]);
  /**
   * Adds the recipe from the favouritesList based on whether
   * it is currently present in the list or not.
   */
  const addToFavourites = () => {
    if (!recipeIsInFavouritesList) {
      setFavouritesList((prevFavourites) => [...prevFavourites, recipe]);
    } else {
      handleClickOpen();
    }
  };
  /**
   * Removes the recipe from the favouritesList based on that
   * it is currently present in the list.
   */
  const removeFromFavourites = () => {
    setFavouritesList((prevFavourites) =>
      prevFavourites.filter((singleRecipe) => {
        return singleRecipe._id !== recipe._id;
      })
    );
  };
  return (
    <div>
      {/* Pop up modal to confirm removing the recipe from the favourites page */}
      <FavouritesModal
        title={recipe.title}
        open={open}
        removeFromFavourites={removeFromFavourites}
        handleClose={handleClose}
      />
      <button
        onClick={addToFavourites}
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
