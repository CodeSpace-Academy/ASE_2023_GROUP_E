import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import NumToTime from '@/component/handlerTime/timeRead';
import style from './previewList.module.css';
import Image from 'next/image';
import Link from 'next/link';
import SingleRecipeTags from '../SingleRecipeTags/SingleRecipeTags';
import ErrorMessage from '@/component/Error/ErrorMessage';
import RecipeFilter from '@/component/filtering/filterList';
import { PiBookOpenText } from 'react-icons/pi';
import { FcClock, FcAlarmClock } from 'react-icons/fc';
import { TfiTimer } from 'react-icons/tfi';
import { PrepandCookTime } from '@/component/handlerTime/timeRead';
import FavouritesButton from '../FavouritesButton/FavouritesButton';

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

export default function PreviewList({ recipes, input }) {
  const [showDescriptions, setShowDescriptions] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    // Initialize the showDescriptions array when the recipes prop is available
    if (recipes) {
      setShowDescriptions(recipes.map(() => false));
    }
  }, [recipes]);

  function toggleDescription(index) {
    const newShowDescriptions = [...showDescriptions];
    newShowDescriptions[index] = !newShowDescriptions[index];
    setShowDescriptions(newShowDescriptions);
  }

  return (
    <>
      <div>
        <button onClick={() => setShowFilter(!showFilter)}>Show Filter</button>
        {showFilter && <RecipeFilter onClose={() => setShowFilter(false)} />}
      </div>
      {/* <SearchBar onSearch={handleSearch} /> */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          {recipes &&
            recipes.map((recipe, index) => {
              return (
                <Grid xs={12} md={12} key={index} className={style.item}>
                  <Item key={recipe.id}>
                    <Link
                      href={`/recipes/${recipe.title}`}
                      className={style.link}
                    >
                      {/**
                       * Check if search bar has text
                       * if true, no matter the case the text in the input is then highlighted on the title of the search results
                       *
                       */}
                      {input ? (
                        <div>
                          {recipe.title
                            .split(new RegExp(`(${input})`, 'i'))
                            .map((title, index) => (
                              <div
                                key={index}
                                style={
                                  title.toLowerCase() === input.toLowerCase()
                                    ? { color: 'orange' }
                                    : {}
                                }
                              >
                                <h3>{title}</h3>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <h3>{recipe.title}</h3>
                      )}

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
                          {showDescriptions[index] && recipe.description ? (
                            <p>{recipe.description}</p>
                          ) : showDescriptions[index] ? (
                            <ErrorMessage message="Failed to load description" />
                          ) : (
                            ''
                          )}
                          <PrepandCookTime recipe={recipe} />
                        </div>
                      </div>

                      {/* Recipe tags */}
                      <SingleRecipeTags tags={recipe.tags} />
                    </Link>
                    <FavouritesButton recipe={recipe} />
                    <PiBookOpenText onClick={() => toggleDescription(index)} />
                  </Item>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
}
