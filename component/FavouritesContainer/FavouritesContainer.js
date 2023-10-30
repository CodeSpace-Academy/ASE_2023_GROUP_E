import React from 'react';
import classes from './FavouritesContainer.module.css';
import StateContext from '@/useContext/StateContext';
import PreviewList from '@/component/Recipes/Preview/PreviewList';
const FavouritesContainer = () => {
  const { favouritesList } = StateContext();
  const favouriteListEmpty = favouritesList.length === 0;
  return (
    <div className={classes.container}>
      <h1>My favourite recipes</h1>
      {/* Recipe list component */}
      {favouriteListEmpty ? (
        <p className={classes.message}>No favourites saved.</p>
      ) : (
        <PreviewList recipes={favouritesList} />
      )}
    </div>
  );
};

export default FavouritesContainer;
