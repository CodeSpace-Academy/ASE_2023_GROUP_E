import React from 'react';
import classes from './FavouritesButton.module.css';
const FavouritesButton = () => {
  return (
    <div>
      <button className={classes.favButton}>Add to favourites</button>
    </div>
  );
};

export default FavouritesButton;
