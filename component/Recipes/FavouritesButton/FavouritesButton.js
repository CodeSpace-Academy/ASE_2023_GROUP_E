import React, { useState, useEffect } from 'react';
import classes from './FavouritesButton.module.css';
const FavouritesButton = ({ onClick, isFavourited, recipe }) => {
  const [isInFavourites, setIsInFavourites] = useState(isFavourited);
  const [favouritesList, setFavouritesList] = useState(
    JSON.parse(localStorage.getItem('favs')) || []
  );
  console.log(favouritesList);
  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favouritesList));
  }, [favouritesList]);
  const toggleIsInFavourites = () => {
    // setIsInFavourites((prevIsInFavourite) => !isInFavourites);
    const recipeIsInFavouritesList = favouritesList.find((singleRecipe) => {
      return singleRecipe._id === recipe._id;
    });
    console.log(recipeIsInFavouritesList);
    if (!recipeIsInFavouritesList) {
      setFavouritesList((prevFavourites) => [...prevFavourites, recipe]);
    }
  };
  return (
    <div>
      <button
        onClick={toggleIsInFavourites}
        className={
          isInFavourites
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
