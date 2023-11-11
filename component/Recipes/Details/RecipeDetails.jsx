// component/Recipe/Preview/RecipeDetails.js

import React from 'react';
import styles from './recipeDetails.module.css';
import { PrepandCookTime } from '@/component/handlerTime/timeRead';
import ImageSlider from './imageSlider/ImageSlider';
import SingleRecipeTags from '../SingleRecipeTags/SingleRecipeTags';
import Instructions from '@/component/editInstructions/editandAddInstruction';
import Nutritions from './nutritions/nutrition';
import Ingredients from './ingredients/ingredient';
import Info from './Info/info';

const RecipeDetails = ({ recipe, allergens }) => {
  if (!recipe) return null;
  return (
    <div className={styles.background}>
      <div className={styles.recipeCard}>
      <h3 className={styles.title}>{recipe.title}</h3>
        <div className={styles.card}>
          <div className={styles.titleAndImage}>
            <div className={styles.imageRow}>
              <ImageSlider imageUrls={recipe.images && recipe.images} />
            </div>
          </div>
          {/* this display when we are on a desktop screen  */}
          <div className={styles.infoDesktop}>
            {<Info recipe={recipe} allergens={allergens} />}
          </div>
        </div>

        {/* this display when we are only on a smaller screen  */}
        <div className={styles.infoMobileView}>
          {<Info recipe={recipe} allergens={allergens} />}
        </div>
        <div>
          {' '}
          <SingleRecipeTags tags={recipe.tags} />
        </div>

        <div className={`${styles.listContainer} list-container`}>
          <Ingredients recipe={recipe} />
          <Nutritions recipe={recipe} />
        </div>
        <div className={styles.instructions}>
          <Instructions recipe={recipe} allergens={allergens} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
