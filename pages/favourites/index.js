import React, { useEffect, useState } from 'react';
import PreviewList from '@/component/Recipes/Preview/PreviewList';
import StateContext from '@/useContext/StateContext';
import FavouritesContainer from '@/component/FavouritesContainer/FavouritesContainer';
const Favourites = () => {
  const { favouritesList } = StateContext();
  const favouriteListEmpty = favouritesList.length === 0;
  return (
    <FavouritesContainer>
      <h1>My favourite recipes</h1>
      {/* Recipe list component */}
      {favouriteListEmpty ? (
        <p>No favourites saved.</p>
      ) : (
        <PreviewList recipes={favouritesList} />
      )}
    </FavouritesContainer>
  );
};

export default Favourites;
