/* This file contains a React component 'RecipeInstructionsList' responsible for displaying
a list of individual recipe instructions using the `IndividualRecipeInstruction` component. */

import React from 'react';
import Paper from '@mui/material/Paper';

import IndividualRecipeIntruction from './individualRecipeIntruction';

/**
 * RecipeInstructionsList component renders a list of individual recipe instructions.
 * Each instruction is displayed using the `IndividualRecipeInstruction` component.
 * @returns {JSX.Element} - Returns the UI displaying the list of instructions.
 */
function RecipeInstructionsList({ instructions }) {
  // Renders individual recipe instructions using the IndividualRecipeInstructions component.
  return (
    <Paper
      variant="outlined"
      sx={{ padding: '2rem', fontFamily: 'sans-serif' }} // Styles the MUI Paper component
    >
      {instructions.map((instruction, index) => {
        return (
          <IndividualRecipeIntruction
            key={index}
            instruction={instruction}
            number={index + 1} // Adding 1 to index for a human-readable numbering
          />
        );
      })}
    </Paper>
  );
}

export default RecipeInstructionsList;
