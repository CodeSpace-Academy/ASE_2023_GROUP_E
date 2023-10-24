import React from 'react';
import classes from './FavouritesButton.module.css';
const FavouritesButton = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick} className={classes.favButton}>
        Add to favourites
      </button>
    </div>
  );
};

export default FavouritesButton;
