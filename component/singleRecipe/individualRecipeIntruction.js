import React from 'react';

const IndividualRecipeIntruction = ({ number, instruction }) => {
  return (
    <div>
      {number + 1}: {instruction}
    </div>
  );
};

export default IndividualRecipeIntruction;
