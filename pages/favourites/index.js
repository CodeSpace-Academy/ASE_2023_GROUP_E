import React, { useEffect, useState } from 'react';
import PreviewList from '@/component/Recipes/Preview/PreviewList';
import classes from './index.module.css'


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
    <div >
      <div className={classes.background}>
      <h1>My favourite recipes</h1>
      {/* Recipe list component */}
      <PreviewList recipes={favouriteRecipesList} />
      </div>
    </div>
  );
};

export default Favourites;
