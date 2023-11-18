// Import React and necessary components/styles
import React from 'react';
import styles from './recipeDetails.module.css';
import ImageSlider from './imageSlider/ImageSlider';
import SingleRecipeTags from '../SingleRecipeTags/SingleRecipeTags';
import Instructions from '@/component/editInstructions/editandAddInstruction';
import Nutritions from './nutritions/nutrition';
import Ingredients from './ingredients/ingredient';
import Info from './Info/info';
import ErrorMessage from '@/component/Error/ErrorMessage';

/**
 * @function RecipeDetails
 * @description A component that displays detailed information about a recipe,
 * including title, images, tags, ingredients, nutrition, instructions, and more.
 * @param {Object} props - The component's properties.
 * @param {Object} props.recipe - The recipe object containing information.
 * @param {Array} props.allergens - An array of allergens.
 * @returns {React.Component} React component displaying detailed recipe information.
 */
const RecipeDetails = ({ recipe, allergens }) => {
  // Return null if no recipe is provided
  if (!recipe) return null;

  return (
    // Container for the entire RecipeDetails component
    <div className={styles.background}>
      <div className={styles.recipeCard}>
        <div className={styles.card}>
          <div className={styles.titleAndImage}>
            <div className={styles.imageRow}>
              {/* Display the image slider */}
              <ImageSlider imageUrls={recipe.images && recipe.images} />
            </div>
          </div>
          {/* Display recipe information on desktop screens */}
          <div className={styles.infoDesktop}>
            {<Info recipe={recipe} allergens={allergens} />}
          </div>
        </div>
        {/* Display recipe information on smaller screens */}
        <div className={styles.infoMobileView}>
          {<Info recipe={recipe} allergens={allergens} />}
        </div>
        {/* Display recipe tags */}
        <div>
          <h5>Tags: </h5>
          {recipe.tags ? (
            <SingleRecipeTags tags={recipe.tags} />
          ) : (
            <ErrorMessage message='Failed to load tags' />
          )}
        </div>
        {/* Display ingredients and nutrition information */}
        <div className={`${styles.listContainer} list-container`}>
          <Ingredients recipe={recipe} />
          <Nutritions recipe={recipe} />
        </div>
        {/* Display recipe instructions */}
        <div className={styles.instructions}>
          <Instructions recipe={recipe} allergens={allergens} />
        </div>
      </div>
    </div>
  );
};


export default RecipeDetails;
