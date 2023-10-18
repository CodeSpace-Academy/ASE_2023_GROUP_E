// component/Recipe/Preview/RecipeDetails
import React from 'react';
import styles from './recipeDetails.module.css';
import NumToTime from '@/component/handlerTime/timeRead';
import ImageSlider from './ImageSlider';
import SingleRecipeTags from '../SingleRecipeTags/SingleRecipeTags';

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
        <div>
          <strong>Tags:</strong> <SingleRecipeTags tags={recipe.tags} />
        </div>
        <div>
          ⏲️ Prep: {NumToTime(recipe.prep)}<br />
          🕰️ Cook: {NumToTime(recipe.cook)}<br />
          ⏰ Total Time: {NumToTime(recipe.prep + recipe.cook)}
        </div>
        <div className={styles.flexContainer}>
          <div className={styles.columnItem}>
            <h2>Nutrition</h2>
            <ul>
              {recipe.nutrition &&
                Object.entries(recipe.nutrition).map(([key, value]) => (
                  <li key={key}>{`${key}: ${value}`}</li>
                ))}
            </ul>
          </div>
          <div className={styles.columnItem}>
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients &&
                Object.entries(recipe.ingredients).map(([ingredient, amount]) => (
                  <li key={ingredient}>{`${ingredient}: ${amount}`}</li>
                ))}
            </ul>
          </div>
          <div className={styles.columnItem}>
            <h2>Instructions</h2>
            <ol>
              {recipe.instructions &&
                recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;