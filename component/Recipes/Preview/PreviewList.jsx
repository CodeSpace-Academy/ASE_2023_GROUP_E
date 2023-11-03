import ErrorMessage from '@/component/Error/ErrorMessage';
import RecipeFilter from '../../../component/filtering/filterList';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { IoIosInformationCircle } from 'react-icons/io';
import SingleRecipeTags from '../SingleRecipeTags/SingleRecipeTags';
import style from './previewList.module.css';
import { PrepandCookTime } from '@/component/handlerTime/timeRead';
import FavouritesButton from '../../Favourites/FavouritesButton/FavouritesButton';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  borderBottom: 'solid gray 2px',
  borderRight: 'solid gray 2px',
  cursor: 'pointer',
  color: '#003153',
}));


export default function PreviewList({ recipes, input, sortDate, filterApplied }) {
  const [showDescriptions, setShowDescriptions] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState([]);


  const applyFiltersRef = useRef(); // Create a ref for applyFilters function


  useEffect(() => {
    // Initialize the showDescriptions array when the recipes prop is available
    if (recipes) {
      setShowDescriptions(recipes.map(() => false));
      applyFiltersRef.current(false)
    }
  }, [recipes]);


  function toggleDescription(index) {
    const newShowDescriptions = [...showDescriptions];
    newShowDescriptions[index] = !newShowDescriptions[index];
    setShowDescriptions(newShowDescriptions);
  }


  // Define a function to apply filters and fetch filtered recipes
  applyFiltersRef.current = async (filterData) => {
    try {
      // Make a request to the filtering API
      const response = await fetch('/api/filtering/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filterData),
      });


      if (response.ok) {
        const data = await response.json();
        setFilteredRecipes(data);
      } else {
        // Handle error here
        console.error('Error applying filters:', response.status);
      }
    } catch (error) {
      // Handle network or other errors here
      console.error('Error applying filters:', error);
    }
  };


  return (
    <>
      <div className="previewMain">
      <button onClick={() => setShowFilter(!showFilter)}>Show Filter</button>
        {showFilter && (
          <RecipeFilter
            sortDate={sortDate}
            onClose={() => setShowFilter(false)}
            applyFilters={applyFiltersRef.current}
          />
        )}
      </div>


      <div className="previewMain">
      {filterApplied ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            {filteredRecipes.map((recipe, index) => (
              <Grid xs={12} md={12} key={index} className={style.item}>
                <Item key={recipe.id}>
                  <Link href={`/recipes/${recipe.title}`} className={style.link}>
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
                      <h3 className={style.title}>{recipe.title}</h3>
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


                    <SingleRecipeTags tags={recipe.tags} />
                  </Link>
                  <FavouritesButton recipe={recipe} />
                  <IoIosInformationCircle
                    color="light gray"
                    fontSize="20px"
                    onClick={() => toggleDescription(index)}
                  />
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            {recipes.map((recipe, index) => (
              <Grid xs={12} md={12} key={index} className={style.item}>
                <Item key={recipe.id}>
                  <Link href={`/recipes/${recipe.title}`} className={style.link}>
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
                      <h3 className={style.title}>{recipe.title}</h3>
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


                    <SingleRecipeTags tags={recipe.tags} />
                  </Link>
                  <FavouritesButton recipe={recipe} />
                  <IoIosInformationCircle
                    color="light gray"
                    fontSize="20px"
                    onClick={() => toggleDescription(index)}
                  />
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
       </div>
    </>
  );
}
