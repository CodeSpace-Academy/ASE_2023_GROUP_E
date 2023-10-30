import React from 'react';
import classes from './FavouritesContainer.module.css';
const FavouritesContainer = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default FavouritesContainer;
