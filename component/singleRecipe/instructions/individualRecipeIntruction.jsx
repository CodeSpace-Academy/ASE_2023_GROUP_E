// Purpose//
/* This file contains a React component "IndividualRecipeInstruction" used to render and
highlight minutes within a recipe instruction. */

import React from 'react';

/**
 * Function to highlight minutes within a recipe instruction.
 * @param {number,string} instruction` (string): Represents the recipe instruction.
   **Description**: This function identifies and highlights minutes within the given instruction
   by wrapping numeric values in brackets and boldening the word "minutes".
 * @returns : An array of React nodes presenting the modified instruction with highlighted minutes.

 */
// The highlightMinutes function employs regular expressions to identify and highlight numeric
// values followed by the word "minutes" within the instruction.

const highlightMinutes = (instruction) => {
  const parts = instruction.split(/(minutes|\d+)/gi);

  return parts.map((part, index) => {
    if (/^\d+$/.test(part)) {
      // If part is an integer, wrap it with brackets
      return (
        // eslint-disable-next-line react/no-array-index-key
        <span key={index} style={{ fontWeight: 'bold' }}>
          {`{${part}}`}
        </span>
      );
    } if (part.toLowerCase() === 'minutes' && ' minute') {
      // Highlight the word "minutes"
      return (
        // eslint-disable-next-line react/no-array-index-key
        <span key={index} style={{ fontWeight: 'bold' }}>
          {part}
        </span>
      );
    }
    return part;
  });
};

function IndividualRecipeIntruction({ instruction }) {
  const highlightedInstruction = highlightMinutes(instruction);

  return <div>{highlightedInstruction}</div>;
}

export default IndividualRecipeIntruction;
