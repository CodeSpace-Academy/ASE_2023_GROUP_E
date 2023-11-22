/* eslint-disable react/no-array-index-key */
import React from 'react';

/**
 * Function to highlight minutes within a recipe instruction.
 * @param {number,string} //number and instruction string
 * @returns
 */

const highlightMinutes = (instruction) => {
  const parts = instruction.split(/(minutes|\d+)/gi);

  return parts.map((part, index) => {
    if (/^\d+$/.test(part)) {
      // If part is an integer, wrap it with brackets
      return (
        <span key={index} style={{ fontWeight: 'bold' }}>
          {`{${part}}`}
        </span>
      );
    } if (part.toLowerCase() === 'minutes' && ' minute') {
      // Highlight the word "minutes"
      return (
        <span key={index} style={{ fontWeight: 'bold' }}>
          {part}
        </span>
      );
    } 
    return part;
    
  });
};

const IndividualRecipeIntruction = ({ instruction }) => {
  const highlightedInstruction = highlightMinutes(instruction);

  return <div>{highlightedInstruction}</div>;
};

export default IndividualRecipeIntruction;
