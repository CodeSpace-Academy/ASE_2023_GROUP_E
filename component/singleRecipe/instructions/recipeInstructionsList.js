import React from 'react';
import IndividualRecipeIntruction from './individualRecipeIntruction';
import Paper from '@mui/material/Paper';

//DUMMY DATA
//Please remove this dummy data when when using the component
//replace the dummy data with the instructions array for the recipe data.
const instructions = [
  'Trim fat from beef, cut into 1-inch pieces.',
  'In Dutch oven, heat oil over medium high hunt until hot. Add beef (hal…',
  'Pour off drippings.',
  'Season with thyme, salt and pepper.',
  'Stir in broth, wine and garlic. Bring to boil; reduce heat to low.',
  'Cover tightly and simmer 1 1/2 hours.',
  'Add carrots and onions.',
  'Cover and continue cooking 35 to 40 minutes or until beef and vegetabl…',
  'Bring beef stew to a boil over medium-high heat. Add cornstarch mixtur…',
  'Reduce heat to medium and cook 3 to 4 minutes or until peas are heated…',
];
/**
 * Takes in single recipe instructions and display each instruction
 * in the individualRecipeInstruction component.
 * @param {array} //single recipe instructions
 * @returns
 */
const RecipeInstructionsList = () => {
  //expect single recipe instructions as a prop
  return (
    <Paper
      variant="outlined"
      sx={{ padding: '2rem', fontFamily: 'sans-serif' }} //styles the mui paper component
    >
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
};

export default RecipeInstructionsList;
