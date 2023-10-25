import React, { useState, useEffect } from 'react';
import classes from './FavouritesButton.module.css';
const FavouritesButton = ({ recipe }) => {
  const [isInFavourites, setIsInFavourites] = useState(null);
  const [favouritesList, setFavouritesList] = useState(
    JSON.parse(localStorage.getItem('favs')) || []
  );
  const recipeIsInFavouritesList = favouritesList.find((singleRecipe) => {
    return singleRecipe._id === recipe._id;
  });

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favouritesList));
  }, [favouritesList, isInFavourites]);

  const toggleIsInFavourites = () => {
    if (!recipeIsInFavouritesList) {
      setFavouritesList((prevFavourites) => [...prevFavourites, recipe]);
      setIsInFavourites(true);
    } else {
      setFavouritesList((prevFavourites) =>
        prevFavourites.filter((singleRecipe) => {
          return singleRecipe._id !== recipe._id;
        })
      );
      setIsInFavourites(false);
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
        Add to favourites
      </button>
    </div>
  );
};

export default FavouritesButton;
