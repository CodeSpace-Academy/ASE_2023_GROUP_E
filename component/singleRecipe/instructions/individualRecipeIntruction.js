import React from 'react';

/**
 * Displays a single instruction from the instruction list.
 * Expects the index number of that instruction from the instructions array and
 * the instruction string.
 * @param {number,string} //number and instruction string
 * @returns
 */

const IndividualRecipeIntruction = ({ number, instruction }) => {
  return (
    <div>
      {number + 1}: {instruction}
    </div>
  );
};

export default IndividualRecipeIntruction;
