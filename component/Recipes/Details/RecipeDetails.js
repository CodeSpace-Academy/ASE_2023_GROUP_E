// component/Recipe/Preview/RecipeDetails
import React, {useState} from 'react';
import styles from './recipeDetails.module.css';
import NumToTime from '@/component/handlerTime/timeRead';
import ImageSlider from './ImageSlider';
import SingleRecipeTags from '../SingleRecipeTags/SingleRecipeTags';

const RecipeDetails = ({ recipe }) => {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

  if (!recipe) return null;

  return (
    <div className={styles.recipeCard}>
      <div className={styles.card}>
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
            <p>{recipe.description.substring(0, 170)}</p>
          </div>
          <strong>Tags:</strong> <SingleRecipeTags tags={recipe.tags} />
        </div>

        <div className={styles.listContainer}>
          <div className={styles.ingredients}>
            <h2>Ingredients:</h2>
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
            <button onClick={() => setShowIngredients(!showIngredients)}>
              {showIngredients ? 'Hide Ingredients' : 'Show Ingredients'}
            </button>
          </div>
          <div className={styles.nutrition}>
            <h2>Nutrition:</h2>
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
            <button onClick={() => setShowNutrition(!showNutrition)}>
              {showNutrition ? 'Hide Nutrition' : 'Show Nutrition'}
            </button>
          </div>
        </div>

        <div>
          {/*adding time to display on preview */}
          ⏲️ Prep: {NumToTime(recipe.prep)}
          🕰️ Cook: {NumToTime(recipe.cook)}
          {/* total time for (added prep and cook) */}
          ⏰ Total Time: {NumToTime(recipe.prep + recipe.cook)}
        </div>
        
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

    </div>
  );
};

export default RecipeDetails;