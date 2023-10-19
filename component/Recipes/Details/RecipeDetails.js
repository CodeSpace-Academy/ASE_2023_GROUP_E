// component/Recipe/Preview/RecipeDetails
import React from 'react';
import Image from 'next/image';
import styles from './recipeDetails.module.css';
import NumToTime from '@/component/handlerTime/timeRead';
import ImageSlider from './ImageSlider';
import SingleRecipeTags from '../SingleRecipeTags/SingleRecipeTags';
import ErrorMessage from '@/component/Error/ErrorMessage';
const RecipeDetails = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className={styles.recipeCard}>
      <div className={styles.titleAndImage}>
        <h1 className={styles.title}>{recipe.title}</h1>
        <div className={styles.imageRow}>
          <ImageSlider imageUrls={recipe.images && recipe.images} />
        </div>
      </div>
      <div className={styles.info}>
        <p>
          <strong>Description:</strong> {recipe.description}
        </p>
        <p>
          <strong>Category:</strong> {recipe.category}
        </p>
        <p>
          <strong>Tags:</strong> <SingleRecipeTags tags={recipe.tags} />
        </p>
      </div>
      <div className={styles.nutrition}>
        <h2>Nutrition:</h2>
        <div className={styles.listContainer}>
          <ul>
            {recipe.nutrition &&
              Object.entries(recipe.nutrition).map(([key, value]) => (
                <li key={key}>{`${key}: ${value}`}</li>
              ))}
          </ul>
        </div>
      </div>
      <div className={styles.ingredients}>
        <h2>Ingredients:</h2>
        <div className={styles.listContainer}>
          <ul>
            {recipe.ingredients &&
              Object.entries(recipe.ingredients).map(([ingredient, amount]) => (
                <li key={ingredient}>{`${ingredient}: ${amount}`}</li>
              ))}
          </ul>
        </div>
      </div>
      {/* Add prep time here */}

      <div>
        <p>{recipe.description.substring(0, 170)}</p>
      </div>
      <div>
        {/*adding time to display on preview */}
        ⏲️ Prep: {NumToTime(recipe.prep)}
      </div>
      <div>🕰️ Cook: {NumToTime(recipe.cook)}</div>
      {/* total time for (added prep and cook) */}
      <div>⏰ Total Time: {NumToTime(recipe.prep + recipe.cook)}</div>

      <div className={styles.instructions}>
        <h2>Instructions:</h2>
        {/* Display error message if cannot load instructions */}
        {recipe.instructions ? (
          <div className={styles.listContainer}>
            <ol>
              {recipe.instructions &&
                recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
            </ol>
          </div>
        ) : (
          <ErrorMessage message={'Error loading the instructions'} />
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
