/* eslint-disable no-undef */
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
 * @param {array} instructions - Represents an array of single recipe instructions.
 * @returns {JSX.Element} - Returns the UI displaying the list of instructions.
 */
function RecipeInstructionsList() {
  // Renders individual recipe instructions using the IndividualRecipeInstructions component.
  return (
    <Paper
      variant="outlined"
      sx={{ padding: '2rem', fontFamily: 'sans-serif' }} // styles the mui paper component
    >

      {instructions.map((instruction, index) => {
        return (
          <IndividualRecipeIntruction
            key={{ index }}
            instruction={instruction}
            number={index}
          />
        );
      })}
    </Paper>
  );
}

export default RecipeInstructionsList;
