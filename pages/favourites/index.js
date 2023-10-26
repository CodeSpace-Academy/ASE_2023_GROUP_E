import React, { useEffect, useState } from 'react';
import PreviewList from '@/component/Recipes/Preview/PreviewList';
const Favourites = () => {
  const [favouriteRecipesList, setFavouriteRecipesList] = useState(
    JSON.parse(localStorage.getItem('favouriteRecipesList')) || []
  );
  console.log(favouriteRecipesList);
  return <PreviewList recipes={favouriteRecipesList} />;
};

export default Favourites;
