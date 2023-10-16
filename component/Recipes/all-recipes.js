import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import NumToTime from '../handlerTime/timeRead';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow:'none',
  borderBottom: 'solid black 2px',
  borderRight: 'solid black 2px',
}));

export default function Recipes({recipes, click}) {
  return (
    <>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>

          {
            recipes && recipes.map((recipe) => {
              return(
                <Grid xs={12} md={4} key={recipe.id}>
                <Item>
                  <h4>{recipe.title}</h4>
              
                  <p>{recipe.description}</p>
                  
                  {/* adding time to display on preview */}
                 <p>⏲️Prep:{NumToTime(recipe.prep)}</p>
                  <p>🕰️Cook:{NumToTime (recipe.cook)}</p>


                  {/* here is the total time for (added prep and cook) */}
                 <p>⏰Total Time: {NumToTime(recipe.prep + recipe.cook)}</p>
        
                  {/* <Image src={recipe.images[0]} alt='image' width={200} height={200}/> */}
                  <ol>{recipe.tags.map((m) => <li>{m}</li>)}</ol >
                
                
                  <button>Details</button>
                </Item>
                
              </Grid>
              )
            })
          }

        </Grid>
      </Box>

      <button onClick={click} >Load More </button>
    </>
  );
}