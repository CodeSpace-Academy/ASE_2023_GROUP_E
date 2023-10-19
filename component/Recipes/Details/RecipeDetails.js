// component/Recipe/Preview/RecipeDetails.js
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './recipeDetails.module.css';
import NumToTime from '@/component/handlerTime/timeRead';
import ImageSlider from './ImageSlider';
import SingleRecipeTags from '../SingleRecipeTags/SingleRecipeTags';
import EditDescription from '@/component/editDescription/editDescription';

const RecipeDetails = ({ recipe }) => {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(recipe.description);

  // Handler for opening the edit description modal
  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };

  // Handler for saving the edited description and closing the modal
  const handleSaveDescription = (newDescription) => {
    setEditedDescription(newDescription);
    // You may want to save the newDescription to your data source here.
    setIsEditingDescription(false); // Close the modal
  };

  // Handler for closing the edit description modal
  const handleCloseDescriptionModal = () => {
    setIsEditingDescription(false);
  };

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

      {isEditingDescription && (
        <EditDescription
          currentDescription={editedDescription}
          onSave={handleSaveDescription}
          onClose={handleCloseDescriptionModal}
        />
      )}
    </div>
  );
};

export default RecipeDetails;
