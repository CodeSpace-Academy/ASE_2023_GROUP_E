// Import React and necessary components/styles
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


/**
 * @function PreviewList
 * @description The main functional component that renders a list of recipe previews.
 * @param {Object} props - The component's properties.
 * @param {Array} props.recipes - An array of recipe objects to be displayed.
 * @param {string} props.input - The input text for highlighting in search results.
 * @param {boolean} props.sortDate - A flag indicating whether to sort recipes by date.
 * @returns {React.Component}  React component displaying a list of recipe previews.
 */

/**
 * @constant {React.Component} Item - A styled component using Material-UI styling.
 */
const Item = styled(Paper)(({ theme }) => {
  return {
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    cursor: 'pointer',
    color: '#003153',
  };
});
export default function PreviewList({ recipes, input, sortDate }) {
  /**
   * @constant {Array} showDescriptions - State variable to manage the visibility of recipe descriptions.
   */
  const [showDescriptions, setShowDescriptions] = useState([]);

  /**
   * @function useEffect
   * @description Initializes the showDescriptions array when the recipes prop is available.
   */
  useEffect(() => {
    if (recipes) {
      setShowDescriptions(recipes.map(() => false));
    }
  }, [recipes]);

  /**
   * @function toggleDescription
   * @description Toggles the visibility of a recipe description.
   * @param {number} index - The index of the recipe in the list.
   */
  function toggleDescription(index) {
    const newShowDescriptions = [...showDescriptions];
    newShowDescriptions[index] = !newShowDescriptions[index];
    setShowDescriptions(newShowDescriptions);
  }

  /**
   * @constant {Object} router - Object for accessing the Next.js router.
   */
  const router = useRouter();

  /**
   * @function handleImageError
   * @description Handles the error when loading a recipe image, setting a placeholder image.
   * @param {Object} event - The event object for the image error.
   */
  const handleImageError = (event) => {
    event.target.src = '../../../public/images/greensald.jpg';
  };

  return (
    <>
      {/* Container for the entire component */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Grid container for displaying recipe previews */}
        <Grid container spacing={1}>
          {recipes &&
            recipes.map((recipe, index) => {
              return (
                // Grid item for each recipe preview
                <Grid xs={12} md={12} key={index} className={style.item}>
                  {/* Paper component for styling */}
                  <Item key={recipe.id}>
                    {/* Link to navigate to the individual recipe page */}
                    <Link href={`/recipes/${recipe.title}`} className={style.link}>
                      {/* Recipe content container */}
                      <div className={style.recipe}>
                        
                        <div>
                          {/* Recipe image */}
                          <Image
                            src={recipe.images[0]}
                            onError={handleImageError}
                            className={style.img}
                            alt={'recipe Image'}
                            width={200}
                            height={100}
                          />
                        </div>
                        {/* Recipe details container */}
                        <div>
                          {/* Display recipe category */}
                          <p className={style.category}>{recipe.category}</p>
                          {/* Recipe title container */}
                          <div className={style.heading}>
                            {/* router.pathname === '/search' ? ( */
                              input ? (
                                // Split title to highlight search input
                                <div>
                                  {recipe.title
                                    .split(new RegExp(`(${input})`, 'i'))
                                    .map((title, index) => (
                                      <span
                                        key={index}
                                        style={
                                          title.toLowerCase() ===
                                          input.toLowerCase()
                                            ? { color: '#a98614' }
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
                          {/* Display recipe description if available */}
                          {showDescriptions[index] && recipe.description ? (
                            <p>{recipe.description}</p>
                          ) : showDescriptions[index] ? (
                            // Display error message if description failed to load
                            <ErrorMessage message="Failed to load description" />
                          ) : (
                            // Empty string if no description to display
                            ''
                          )}
                          {/* Display preparation and cooking time */}
                          <PrepandCookTime recipe={recipe} />
                        </div>
                      </div>
                    </Link>
                    {/* Container for recipe tags and icons */}
                    <div className={style.tagAndIconsContainer}>
                      {/* Display recipe tags */}
                      <SingleRecipeTags tags={recipe.tags} />
                      {/* Container for favorite button and information icon */}
                      <div className={style.favAndInfoIconContainer}>
                        {/* Favorite button */}
                        <FavouritesButton recipe={recipe} />
                        {/* Information icon for toggling recipe description */}
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