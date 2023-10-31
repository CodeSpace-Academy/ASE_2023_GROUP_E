import React from 'react';
import PreviewList from '../../component/Recipes/Preview/PreviewList';
import StateContext from '../../useContext/StateContext';

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
