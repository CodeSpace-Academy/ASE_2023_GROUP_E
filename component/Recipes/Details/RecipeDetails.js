// component/Recipe/Preview/RecipeDetails

import React, { useState } from 'react';
import styles from './recipeDetails.module.css';
import NumToTime from '@/component/handlerTime/timeRead';
import ImageSlider from './ImageSlider';
import SingleRecipeTags from '../SingleRecipeTags/SingleRecipeTags';
import ErrorMessage from '@/component/Error/ErrorMessage';
import IndividualRecipeIntruction from '@/component/singleRecipe/instructions/individualRecipeIntruction'
import SingleRecipeAllergens from '../Allergens/SingleRecipeAllergens';

const RecipeDetails = ({ recipe }) => {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

const RecipeDetails = ({ recipe, allergens }) => {
  /**
   * Contains the allergens present in this recipe
   */
  let allergenList = [];
  //If ingredient is present in allergen array, add it to the allergens list
  for (let ingredient in recipe.ingredients) {
    if (allergens?.includes(ingredient)) {
      allergenList.push(ingredient);
    }
  }


  if (!recipe) return null;
  return (
    <div className={styles.recipeCard}>

    <h1 className={styles.title}>{recipe.title}</h1>
      <div className={styles.card}>
        <div className={styles.titleAndImage}>
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
            <p>{recipe.description.substring(0, 170)}</p>
          </div>
            <SingleRecipeTags tags={recipe.tags} />
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

      <div className={styles.listContainer}>
        <div className={styles.ingredients}>
          <h2 className={styles.heading}>Ingredients:</h2>
          {showIngredients && (
            <div>
              <ul>
                {recipe.ingredients &&
                  Object.entries(recipe.ingredients).map(([ingredient, amount]) => (
                    <li key={ingredient}>{`${ingredient}: ${amount}`}</li>
                  ))}
              </ul>
            </div>
          )}
          <button className={styles.button} onClick={() => setShowIngredients(!showIngredients)}>
            {showIngredients ? 'Hide Ingredients' : 'Show Ingredients'}
          </button>
        </div>

        <div className={styles.nutrition}>
          <h2 className={styles.heading}>Nutrition:</h2>
          {showNutrition && (
            <div>
              <ul>
                {recipe.nutrition &&
                  Object.entries(recipe.nutrition).map(([key, value]) => (
                    <li key={key}>{`${key}: ${value}`}</li>
                  ))}
              </ul>
            </div>
          )}
          <button className={styles.button} onClick={() => setShowNutrition(!showNutrition)}>
            {showNutrition ? 'Hide Nutrition' : 'Show Nutrition'}
          </button>
        </div>

        <div className={styles.myDiv}>
          {/*adding time to display on preview */}
          ⏲️ Prep: {NumToTime(recipe.prep)}
          🕰️ Cook: {NumToTime(recipe.cook)}
          {/* total time for (added prep and cook) */}
          ⏰ Total Time: {NumToTime(recipe.prep + recipe.cook)}
        </div>
      </div>
   
      </div>


      <div className={styles.instructions}>
        <h2>Instructions:</h2>

        <div className={`${styles.listContainer} ${styles.list}`}>
          <ol className={styles.orderedList}>
            {recipe.instructions &&
              recipe.instructions.map((instruction, index) => (
                <li className={styles.listItem} key={index}>{instruction}</li>
              ))}
          </ol>
        </div>

        {/* Display error message if cannot load instructions */}
        {recipe.instructions ? (
          <div className={styles.listContainer}>
            <ol>
              {recipe.instructions &&
                recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}
                   <IndividualRecipeIntruction
                      number={index}
                      instruction={instruction}
                    />
                 </li>
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