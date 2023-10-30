import React, { useEffect, useState } from 'react';
import PreviewList from '@/component/Recipes/Preview/PreviewList';
import StateContext from '@/useContext/StateContext';
import classes from './index.module.css'



const Favourites = () => {
  const { favouritesList } = StateContext();

  return (
    <div>
      <div className={classes.background}>
      <h1>My favourite recipes</h1>
      {/* Recipe list component */}
      <PreviewList recipes={favouritesList} />
      </div>
    </div>
  );
};

export default Favourites;
