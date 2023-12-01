import React from 'react';
import classes from './FavouritesContainer.module.css';
import StateContext from '../../../useContext/StateContext';
import PreviewList from '../../Recipes/Preview/PreviewList';

export default function FavouritesContainer() {
  const { favouritesList } = StateContext();
  const favouriteListEmpty = favouritesList.length === 0;
  const favouritesContent = favouriteListEmpty ? (
    <p className={classes.message}>No favourites saved.</p>
  ) : (
    <PreviewList recipes={favouritesList} />
  );
  return (
    <div className={classes.container}>
      <h1>My favourite recipes</h1>
      {/* Recipe list component */}
      {favouritesList && favouritesContent}
    </div>
  );
}
