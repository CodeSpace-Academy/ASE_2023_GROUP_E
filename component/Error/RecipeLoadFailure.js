// RecipeLoadFailure.js

import React from 'react';


function RecipeLoadFailure({ message }) {
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  );
}

export default RecipeLoadFailure;
