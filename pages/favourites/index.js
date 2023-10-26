import React, { useEffect, useState } from 'react';
import PreviewList from '@/component/Recipes/Preview/PreviewList';
const Favourites = () => {
  const [favouriteRecipesList, setFavouriteRecipesList] = useState([]);
  //Get the favourites from local storage after the page loads
  //and change the favouriteRecipesList state.
  useEffect(() => {
    const storedData = localStorage.getItem('favouriteRecipesList');
    if (storedData) {
      setFavouriteRecipesList(JSON.parse(storedData));
    }
  }, []);
  return (
    <>
      <h1>My favourite recipes</h1>
      {/* Recipe list component */}
      <PreviewList recipes={favouriteRecipesList} />
    </>
  );
};

export default Favourites;
