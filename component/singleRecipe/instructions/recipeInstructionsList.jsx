// ### Purpose
/* This file contains a React component 'RecipeInstructionsList' responsible for displaying
a list of individual recipe instructions using the `IndividualRecipeInstruction` component. */

import React from 'react';
import Paper from '@mui/material/Paper';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import IndividualRecipeIntruction from './individualRecipeIntruction';

/**
 * Takes in single recipe instructions and display each instruction
 * in the individualRecipeInstruction component.
 * @param {array} //single recipe instructions
 * @returns
 */
function RecipeInstructionsList() {
  // expect single recipe instructions as a prop
  return (
    <Paper
      variant="outlined"
      sx={{ padding: '2rem', fontFamily: 'sans-serif' }} // styles the mui paper component
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    >
      // eslint-disable-next-line no-undef,
      {instructions.map((instruction, index) => {
        return (
          <IndividualRecipeIntruction
            key={index}
            instruction={instruction}
            number={index}
          />
        );
      })}
    </Paper>
  );
}

export default RecipeInstructionsList;
