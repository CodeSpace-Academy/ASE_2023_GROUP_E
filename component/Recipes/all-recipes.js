import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import NumToTime from '../handlerTime/timeRead';
import RecipeLoadFailure from '../Error/RecipeLoadFailure';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  borderBottom: 'solid black 2px',
  borderRight: 'solid black 2px',
}));

export default function Recipes({ recipes, click }) {
  const [showDescription, setShowDescription] = useState(false);
  const [error, setError] = useState(false);

 /*const fetch = require('node-fetch');*/

  async function handleRecipeInstructions() {
    try {
      const response = await fetch('https:url');
      if (!response.ok) {
        throw new Error('Failed to load instructions');
      }
      const data = await response.json();
      console.log(data);   
    } catch (error) {
      // An error occurred, set the error state to true
      setError(true);
      console.error('Error:', error);
    }
  }

  function toggleDescription() {
    setShowDescription(!showDescription);
  }

  useEffect(() => {
    // You can call the function to fetch instructions when the component mounts
    handleRecipeInstructions();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {recipes &&
          recipes.map((recipe) => {
            return (
              <Grid item xs={12} md={4} key={recipe.id}>
                <Item>
                  <h4 onClick={toggleDescription}>{recipe.title}</h4>
                  {showDescription && <p>{recipe.description}</p>}
                  <p> </p>
                  {/* Adding time to display on preview */}
                  <p>⏲️Prep:{NumToTime(recipe.prep)}</p>
                  <p>🕰️Cook:{NumToTime(recipe.cook)}</p>

                  {/* Here is the total time for (added prep and cook) */}
                  <p>⏰Total Time: {NumToTime(recipe.prep + recipe.cook)}</p>

                  {/* Error handling */}
                  {error ? (
                    <RecipeLoadFailure message="Failed to load instructions" />
                  ) : (
                     'Render your recipe instructions here'
                    // If no error, render the recipe instructions
                  )};

                  <ol>{recipe.tags.map((m) => <li key={m}>{m}</li>)}</ol>
                </Item>
              </Grid>
            );
          })}
      </Grid>
      <button onClick={click}>Load More</button>
    </Box>
  );
}
