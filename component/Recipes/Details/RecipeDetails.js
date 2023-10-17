// component/Recipe/Preview/RecipeDetails
import React from 'react';
import Image from 'next/image';
import styles from './recipeDetails.module.css'

const RecipeDetails = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className={styles.recipeCard}>
      <div className={styles.titleAndImage}>
        <h1 className={styles.title}>{recipe.title}</h1>
        <div className={styles.imageRow}>
          {recipe.images &&
            recipe.images.map((image, index) => (
              <div key={index} className={styles.imageContainer}>
                <Image src={image} alt={`Image ${index + 1}`} width={300} height={200} />
              </div>
            ))}
        </div>
      </div>
      <div className={styles.info}>
        <p><strong>Description:</strong> {recipe.description}</p>
        <p><strong>Category:</strong> {recipe.category}</p>
        <p><strong>Tags:</strong> {recipe.tags.join(', ')}</p>
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

      <div className={styles.instructions}>
        <h2>Instructions:</h2>
        {/* Add instruction here */}
       
      </div>
    </div>
  );
};

export default RecipeDetails;
