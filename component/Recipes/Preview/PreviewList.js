import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import RecipeDetails from '../Details/RecipeDetails';
import NumToTime from '@/component/handlerTime/timeRead';
import style from './previewList.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SingleRecipeTags from '../SingleRecipeTags/SingleRecipeTags';
import ErrorMessage from '@/component/Error/ErrorMessage';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  borderBottom: 'solid black 2px',
  borderRight: 'solid black 2px',
  cursor: 'pointer',
}));

export default function PreviewList({ recipes, click }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDescriptions, setShowDescriptions] = useState([]);
  const router = useRouter();
  const currentPath = router.query.preview;

  useEffect(() => {
    // Initialize the showDescriptions array when the recipes prop is available
    if (recipes) {
      setShowDescriptions(recipes.map(() => false));
    }
  }, [recipes]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const toggleDescription = (index) => {
    const newShowDescriptions = [...showDescriptions];
    newShowDescriptions[index] = !newShowDescriptions[index];
    setShowDescriptions(newShowDescriptions);
  };

  return (
    <>
    <
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          {recipes &&
            recipes.map((recipe, index) => {
              return (
                <Grid xs={12} md={12} key={index} className={style.item}>
                  <Item
                    key={recipe.id}
                    onClick={() => handleRecipeClick(recipe)}
                  >
                    <Link
                      href={`/recipes/${recipe.title}`}
                      className={style.link}
                    >
                      <h2 className={style.title}>{recipe.title}</h2>
                      <div className={style.recipe}>
                        <div>
                          <Image
                            src={recipe.images[0]}
                            className={style.img}
                            alt={recipe.images[0]}
                            width={200}
                            height={100}
                          />
                        </div>
                        <div>
                          {
                            showDescriptions[index] &&  recipe.description ? 
                            (<p>{recipe.description}</p>) : 
                            showDescriptions[index] ? <ErrorMessage message = 'Failed to load description' /> : ''
                          }
                          <div className={style.times}>
                            <div>⏲️ Prep: {NumToTime(recipe.prep)}</div>
                            <div>🕰️ Cook: {NumToTime(recipe.cook)}</div>
                            <div>
                              ⏰ Total Time:{' '}
                              {NumToTime(recipe.prep + recipe.cook)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recipe tags */}
                      <SingleRecipeTags tags={recipe.tags} />
                    </Link>

                    <button onClick={() => toggleDescription(index)}>
                        Show Description
                    </button>

                  </Item>
                </Grid>
              );
            })}
        </Grid>
      </Box>

    </>
  );
}
