import React from 'react';
import PreviewList from '../../component/Recipes/Preview/PreviewList.js';
import StateContext from '../../useContext/StateContext.js';

function Favourites() {
  const { favouritesList } = StateContext();

  return (
    <>
      <h1>My favourite recipes</h1>
      {/* Recipe list component */}
      <PreviewList recipes={favouritesList} />
    </>
  );
}

export default Favourites;
