import React, { useEffect } from 'react';
// Favourites button. When clicked users can add the recipe to the favourties recipe list in
// the local storage. If the recipe is already in the favourites recipes list, then it will open
// a modal where the user can decide whether to remove the recipe from the favourites recipe list.
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import classes from './FavouritesButton.module.css';
import StateContext from '../../../useContext/StateContext';
import FavouritesModal from '../FavouritesModal/FavouritesModal';
/**
 * When clicked can add or remove the recipe provided from the favourite recipes list.
 * @param {object} props
 * @param {object} props.recipe Single recipe
 * @returns {JSX.Element} Div containing the favourites button and the favourites delete modal
 */
export default function FavouritesButton({ recipe }) {
  // Global state list of favourite recipes
  const { favouritesList, setFavouritesList } = StateContext();
  /**
   * Returns the recipe if it is already in the favouritesList
   */
  const recipeIsInFavouritesList = favouritesList.find((singleRecipe) => {
    return singleRecipe._id === recipe._id;
  });
  // Modal open state
  const [isFavouritesModalOpen, setIsModalOpen] = React.useState(false);
  /**
   * Opens the modal
   */
  const handleOpenFavouriteModal = () => {
    setIsModalOpen(true);
  };
  /**
   * Closes the modal
   */
  const handleCloseFavouriteModal = () => {
    setIsModalOpen(false);
  };

  // set the favouriteRecipesList in local storage each time the favouritesList is updated
  useEffect(() => {
    localStorage.setItem(
      'favouriteRecipesList',
      JSON.stringify(favouritesList),
    );
  }, [favouritesList]);
  /**
   * Adds the recipe from the favouritesList based on whether
   * it is currently present in the list or not.
   */
  const addRecipeToFavourites = () => {
    if (!recipeIsInFavouritesList) {
      setFavouritesList((prevFavourites) => {
        return [...prevFavourites, recipe];
      });
    } else {
      handleOpenFavouriteModal();
    }
  };
  /**
   * Removes the recipe from the favouritesList based on that
   * it is currently present in the list.
   */
  const removeRecipeFromFavourites = () => {
    setFavouritesList((prevFavourites) => {
      return prevFavourites.filter((singleRecipe) => {
        return singleRecipe._id !== recipe._id;
      });
    });
  };
  return (
    <div>
      {/* Pop up modal to confirm removing the recipe from the favourites page */}
      <FavouritesModal
        title={recipe.title}
        isFavouritesModalOpen={isFavouritesModalOpen}
        removeRecipeFromFavourites={removeRecipeFromFavourites}
        handleCloseFavouriteModal={handleCloseFavouriteModal}
      />
      <button
        onClick={addRecipeToFavourites}
        type="button"
        className={classes.favButton}
      >
        {recipeIsInFavouritesList ? (
          <FaHeart className={`${classes.isFavourite} ${classes.icon}`} />
        ) : (
          <FaRegHeart className={` ${classes.icon}`} />
        )}
      </button>
    </div>
  );
}
