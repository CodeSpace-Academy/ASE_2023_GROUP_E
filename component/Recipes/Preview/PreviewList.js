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
import {PiBookOpenText } from 'react-icons/pi';
import {FcClock,FcAlarmClock } from 'react-icons/fc';
import{TfiTimer} from 'react-icons/tfi'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  borderBottom: 'solid #eeeeee 1px',
  borderRight: 'solid #eeeeee 1px',
  borderLeft: 'solid #eeeeee 1px',
  cursor: 'pointer',
 

  
  
}));


export default function PreviewList({ recipes, click, input }) {

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDescriptions, setShowDescriptions] = useState([]);
  const router = useRouter();
  const currentPath = router.query.preview;
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    // Initialize the showDescriptions array when the recipes prop is available
    if (recipes) {
      setShowDescriptions(recipes.map(() => false));
    }
  }, [recipes]);


  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };




  // const handleSearch = async (category) => {
  //   try {
  //     const response = await fetch(`/api/search?category=${category}`);
  //     const data = await response.json();
  //     console.log('Search results:', data);
  //     // Update state or perform actions based on the search results
  //   } catch (error) {
  //     console.error('Error fetching recipes:', error);
  //   }
  // };


  const toggleDescription = (index) => {
    const newShowDescriptions = [...showDescriptions];
    newShowDescriptions[index] = !newShowDescriptions[index];
    setShowDescriptions(newShowDescriptions);
  };


  return (
    <>
    {/* <SearchBar onSearch={handleSearch} /> */}
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

                      {/** 
                       * Check if search bar has text
                       * if true, no matter the case the text in the input is then highlighted on the title of the search results
                       * 
                      */}
                      {
                        input ? (
                          <div>
                            {recipe.title.split(new RegExp(`(${input})`, "i")).map((title, index) => (
                              <div
                                key={index}
                                style={title.toLowerCase() === input.toLowerCase() ? { color: "orange" } : {}}>
                                <h3>{title}</h3>
                            </div>
                            ))}

                          </div>
                        ) : (
                          <h3>{recipe.title}</h3>
                        )
                      }
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
                       <div className={style.details}>
                       <h4 className={style.title}>{recipe.title}</h4>
                         <div>
                          {
                            showDescriptions[index] &&  recipe.description ?
                            (<p>{recipe.description}</p>) :
                            showDescriptions[index] ? <ErrorMessage message = 'Failed to load description' /> : ''
                          }
                          <div className={style.times}>
                            <div> <FcClock/> Prep: {NumToTime(recipe.prep)}</div>
                            <div> <FcAlarmClock/> Cook: {NumToTime(recipe.cook)}</div>
                            <div>
                              <TfiTimer/> Total Time:{' '}
                              {NumToTime(recipe.prep + recipe.cook)}
                            </div>
                          </div>
                        </div>
                        <SingleRecipeTags tags={recipe.tags} />
                        </div>
                      </div>


                      {/* Recipe tags */}
                     
                    </Link>
                  

                  
                      <PiBookOpenText onClick={() => toggleDescription(index)}
                        Show Description/>
                        


                  </Item>
                </Grid>
              );
            })}
        </Grid>
      </Box>


    </>
  );
}



