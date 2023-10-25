import React from 'react';
import styles from './IngredientsList.module.css';

const IngredientsList = ({ recipes }) => {
  return (
    <div className={styles.ingredientList}>
      {recipes &&
        recipes.map((ingredientObj, index) => {
          // Extract the actual ingredient string from the object
          const ingredient = Object.keys(ingredientObj)[0];

          return (
            <div className={styles.item} key={index}>
              <button>{ingredient}</button>
            </div>
          );
        })}
    </div>
  );
};

export default IngredientsList;
