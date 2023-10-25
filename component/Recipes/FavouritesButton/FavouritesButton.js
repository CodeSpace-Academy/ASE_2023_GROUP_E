import React, { useState, useEffect } from 'react';
import classes from './FavouritesButton.module.css';
const FavouritesButton = ({ recipe }) => {
  const [favouritesList, setFavouritesList] = useState(
    JSON.parse(localStorage.getItem('favs')) || []
  );
  const recipeIsInFavouritesList = favouritesList.find((singleRecipe) => {
    return singleRecipe._id === recipe._id;
  });

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favouritesList));
  }, [favouritesList]);

  const toggleIsInFavourites = () => {
    if (!recipeIsInFavouritesList) {
      setFavouritesList((prevFavourites) => [...prevFavourites, recipe]);
    } else {
      setFavouritesList((prevFavourites) =>
        prevFavourites.filter((singleRecipe) => {
          return singleRecipe._id !== recipe._id;
        })
      );
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
