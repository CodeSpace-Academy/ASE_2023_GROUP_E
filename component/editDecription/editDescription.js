import StateContext from '@/useContext/StateContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import classes from './editDescription.module.css'
import Button from '../Button/button';
import { addItem } from '@/database/addToDatabase';

function EditDescription({info}) {
  const [newDescription, setNewDescription] = useState(info);
  const { edit, setEdit }= StateContext()


  const router = useRouter()
  const titleRouter = router.query.recipe


  async function addItemHandler(e) {
    e.preventDefault()


    //hides form after editing
    setEdit(!edit)


    try {
      await addItem('/api/insertData',{ recipeTitle: titleRouter, recipeDescription: newDescription });
    } catch (error) {
      console.log('Error adding item');
    }
  }
 
  return (
    <form className={classes.form}>
      <textarea
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <div className={classes.buttons}>
        <Button text={'SAVE'} color={'success'} click={addItemHandler}/>
        <Button text={'CLOSE'} color={'warning'} click={() => setEdit(!edit)}/>
      </div>
    </form>
  );
}


export default EditDescription;


//Make and share this Low-Fat Berry Blue Frozen Dessert recipe from Food.com.


