import React, { useState } from 'react';
import { useRouter } from 'next/router';
import StateContext from '../../useContext/StateContext';
import classes from './editDescription.module.css';
import Button, { FormButton } from '../Button/button';

function EditDescription({ info }) {
  const [newDescription, setNewDescription] = useState(info);
  const { edit, setEdit } = StateContext();

  const router = useRouter();
  const idRouter = router.query.recipe;

  async function addItemHandler(e) {
    e.preventDefault();
    // hides form after editing
    setEdit(!edit);

    try {
      await addItem('/api/editRecipe', { recipeId: idRouter, recipeValue: newDescription, key: 'description', stage: '$set' });
    } catch (error) {
      console.log('Error adding item');
    }
  }
  return (
    <form className={classes.form} onSubmit={addItemHandler}>
      <textarea
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <div className={classes.buttons}>
        <Button text="CLOSE" color="warning" click={() => setEdit(!edit)} />
        <FormButton text="SAVE" />
      </div>
    </form>
  );
}
export default EditDescription;

// Make and share this Low-Fat Berry Blue Frozen Dessert recipe from Food.com.

/**
 * Asynchronously adds an item to a specified API endpoint using a POST request.
 *
 * @param {string} apiPath - The URL or path of the API endpoint where the item will be added. eg('/api/filename')
 * @param {Object} item - The item to be added to the API. Should be a JavaScript object.eg({key: value})
 * @returns {Promise<Object>} A promise that resolves to the response data from the API.
 * @throws {Error} If the POST request fails or the response status is not OK, an error is thrown with a message.
 */
async function addItem(apiPath, item) {
  const response = await fetch(apiPath, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
  return data;
}