import ErrorMessage from '@/component/Error/ErrorMessage';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoIosInformationCircle } from 'react-icons/io';
import SingleRecipeTags from '../SingleRecipeTags/SingleRecipeTags';
import style from './previewList.module.css';
import { PrepandCookTime } from '@/component/handlerTime/timeRead';
import FavouritesButton from '../../Favourites/FavouritesButton/FavouritesButton';
import { useRouter } from 'next/router';

const Item = styled(Paper)(({ theme }) => {
  return {
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    // borderBottom: 'solid gray 2px',
    // borderRight: 'solid gray 2px',
    cursor: 'pointer',
    color: '#003153',
  };
});

export default function PreviewList({ recipes, input, sortDate }) {
  const [showDescriptions, setShowDescriptions] = useState([]);

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

  const router = useRouter();

  const handleImageError = (event) => {
    // Set the src attribute to a placeholder or alternative image URL
    event.target.src = '../../../public/images/greensald.jpg';
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

                      <div className={style.recipe}>
                        <div>
                          <Image
                            src={recipe.images[0]}
                            onError={handleImageError}
                            className={style.img}
                            alt={'recipe Image'}
                            width={200}
                            height={100}
                          />
                        </div>
                        <div>
                          <p className={style.category}>{recipe.category}</p>
                          <div className={style.heading}>
                            {/* router.pathname === '/search' ? ( */
                              input ? (
                                <div>
                                  {recipe.title
                                    .split(new RegExp(`(${input})`, 'i'))
                                    .map((title, index) => (
                                      <span
                                        key={index}
                                        style={
                                          title.toLowerCase() ===
                                          input.toLowerCase()
                                            ? { color: 'orange' }
                                            : {}
                                        }
                                      >
                                        <h3 style={{ display: 'inline' }}>
                                          {title}
                                        </h3>
                                      </span>
                                    ))}
                                </div>
                              ) : (
                                <h3>{recipe.title}</h3>
                              )
                           /* )  : (
                              <h3>{recipe.title}</h3>
                            ) */}
                          </div>
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
                    </Link>
                    <div className={style.tagAndIconsContainer}>
                      <SingleRecipeTags tags={recipe.tags} />
                      <div className={style.favAndInfoIconContainer}>
                        <FavouritesButton recipe={recipe} />
                        <IoIosInformationCircle
                          color="light gray"
                          fontSize="20px"
                          className={style.infoIcon}
                          onClick={() => toggleDescription(index)}
                        />
                      </div>
                    </div>
                  </Item>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
}
