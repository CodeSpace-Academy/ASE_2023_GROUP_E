import React, { useState } from 'react';
import classes from './FavouritesButton.module.css';
const FavouritesButton = ({ onClick, isFavourited }) => {
  const [isInFavourites, setIsInFavourites] = useState(isFavourited);

  const toggleIsFavourite = () => {
    setIsInFavourites((prevIsInFavourite) => !isInFavourites);
  };
  return (
    <div>
      <button
        onClick={toggleIsFavourite}
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
