import React, { useState } from 'react';
import { useRouter } from 'next/router';
import StateContext from '../../useContext/StateContext';
import classes from './editDescription.module.css';
import Button, { FormButton } from '../Button/button';
import { addItem } from '../../database/addToDatabase';

function EditDescription({ info }) {
  const [newDescription, setNewDescription] = useState(info);
  const { edit, setEdit } = StateContext();

  const router = useRouter();
  const titleRouter = router.query.recipe;

  async function addItemHandler(e) {
    e.preventDefault();
    // hides form after editing
    setEdit(!edit);

    try {
      await addItem('/api/editDescription', { recipeTitle: titleRouter, recipeDescription: newDescription });
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
