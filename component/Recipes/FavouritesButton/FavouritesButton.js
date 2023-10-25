import React, { useState } from 'react';
import classes from './FavouritesButton.module.css';
const FavouritesButton = ({ onClick, isFavourited }) => {
  const [isInFavourites, setIsInFavourites] = useState(isFavourited);

  const toggleIsInFavourites = () => {
    setIsInFavourites((prevIsInFavourite) => !isInFavourites);
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
