// component/Recipe/Preview/RecipeDetails.js
import React, { useState } from 'react';
import Image from 'next/image';
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
          <strong>Description:</strong> {editedDescription}
        </p>
        <button onClick={EditDescription}>Edit Description</button>
        <p>
          <strong>Category:</strong> {recipe.category}
        </p>
        <p>
          <strong>Tags:</strong> <SingleRecipeTags tags={recipe.tags} />
        </p>
        <p className={styles.aligned}>
          <strong>Allergens:</strong>
          {allergenList.length !== 0 ? (
            <SingleRecipeAllergens allergensList={allergenList} />
          ) : (
            <p>No allergens</p>
          )}
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
      <div>⏲️ Prep: {NumToTime(recipe.prep)}</div>
      <div>🕰️ Cook: {NumToTime(recipe.cook)}</div>
      <div>⏰ Total Time: {NumToTime(recipe.prep + recipe.cook)}</div>

      <div className={styles.instructions}>
        <h2>Instructions:</h2>
        <div className={styles.listContainer}>
          <ol>
            {recipe.instructions &&
              recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
