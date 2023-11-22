import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

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

/**
 * Displays a list of tags
 * @param {Object} recipe - props object
 * @returns {JSX.Element} - Lists of tags
 */

export default function TagsListt({recipes}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

        {
          recipes && recipes.map((recipe) => {
            return(
              <Grid xs={12} md={4} key={recipe}>
                <Item key={recipe}> 
                  <h4>{recipe}</h4>
                </Item>
              </Grid>
            )
          })
        }

      </Grid>
    </Box>
  );
}
