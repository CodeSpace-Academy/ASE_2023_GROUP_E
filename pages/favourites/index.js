import React, { useEffect, useState } from 'react';
import PreviewList from '@/component/Recipes/Preview/PreviewList';
const Favourites = () => {
  const [favouriteRecipesList, setFavouriteRecipesList] = useState(
    JSON.parse(localStorage.getItem('favouriteRecipesList')) || []
  );

  return (
    <>
      <h1>My favourite recipes</h1>
      <PreviewList recipes={favouriteRecipesList} />;
    </>
  );
};

export default Favourites;
