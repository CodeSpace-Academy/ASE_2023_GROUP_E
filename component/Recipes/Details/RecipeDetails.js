
// component/Recipe/Preview/RecipeDetails.js

import React, { useState } from 'react';
import styles from './recipeDetails.module.css';
import NumToTime from '@/component/handlerTime/timeRead';
import ImageSlider from './ImageSlider';
import SingleRecipeTags from '../SingleRecipeTags/SingleRecipeTags';
import ErrorMessage from '@/component/Error/ErrorMessage';
import IndividualRecipeIntruction from '@/component/singleRecipe/instructions/individualRecipeIntruction';
import SingleRecipeAllergens from '../Allergens/SingleRecipeAllergens';
import EditDescription from '@/component/editDecription/editDescription';
import StateContext from '@/useContext/StateContext';
import Button from '@/component/Button/button';
import EditInstruction from '@/component/editInstructions/editInstructions';

const RecipeDetails = ({ recipe, allergens }) => {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const { edit, setEdit, setEditInstruction, editInstruction }= StateContext()

  /**
   * Contains the allergens present in this recipe
   */
  let allergenList = [];
  // If ingredient is present in allergen array, add it to the allergens list
  for (let ingredient in recipe.ingredients) {
    if (allergens?.includes(ingredient)) {
      allergenList.push(ingredient);
    }
  }

  if (!recipe) return null;
  return (
    <div className={styles.recipeCard}>
      <div className={styles.card}>
        <div className={styles.titleAndImage}>
          <div className={styles.imageRow}>
            <ImageSlider imageUrls={recipe.images && recipe.images} />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.info1}> 
          <div><strong>Description:</strong> {recipe.description}</div>

          {/**
           * {@link info} is a props that hold the current descripton that will get modified
           */}
          {  edit ? <EditDescription info={recipe.description} /> : <Button color={'success'} text={'Edit Description'} click={() => setEdit(!edit)}/>}

          <div><strong>Category:</strong> {recipe.category}</div>
          <div> <SingleRecipeTags tags={recipe.tags} /></div>
          <div className={styles.aligned}>
            <strong>Allergens:</strong>
            {allergenList.length !== 0 ? (
              <SingleRecipeAllergens allergensList={allergenList} />
            ) : (
              <p>No allergens</p>
            )}
          </div>
          </div>

        </div>
      </div>

      <div className={`${styles.listContainer} list-container`}>
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
          {/* Adding time to display on preview */}
          ⏲️ Prep: {NumToTime(recipe.prep)}
          🕰️ Cook: {NumToTime(recipe.cook)}
          {/* Total time for (added prep and cook) */}
          ⏰ Total Time: {NumToTime(recipe.prep + recipe.cook)}
        </div>
      </div>

      <div className={styles.instructions}>
        <h2>Instructions:</h2>
        {recipe.instructions ? (
          <div className={styles.listContainer}>
            <ol>
              {recipe.instructions &&
                recipe.instructions.map((instruction, index) => (
                  <li key={index}>
                    <IndividualRecipeIntruction
                      number={index}
                      instruction={instruction}
                    />
                  </li>
                ))}
            </ol>
            {  editInstruction ? <EditInstruction info={recipe.instructions} /> : <Button color={'success'} text={'Edit Description'} click={() => setEditInstruction(!editInstruction)}/>}
          </div>
        ) : (
          <ErrorMessage message={'Error loading the instructions'} />
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;

//Toss 2 cups berries with sugar.,Let stand for 45 minutes, stirring occasionally.,Transfer berry-sugar mixture to food processor.,Add yogurt and process until smooth.,Strain through fine sieve. Pour into baking pan (or transfer to ice cream maker and process according to manufacturers' directions). Freeze uncovered until edges are solid but centre is soft.  Transfer to processor and blend until smooth again.,Return to pan and freeze until edges are solid.,Transfer to processor and blend until smooth again.,Fold in remaining 2 cups of blueberries.,Pour into plastic mold and freeze overnight. Let soften slightly to serve.,it works maybe