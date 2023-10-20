import StateContext from '@/useContext/StateContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import classes from './editDescription.module.css'
import Button from '../Button/button';


/**
 *
 * @param {object} item is an object that hold is used in the body
 * {@link addItem} is used to connect the api folder,  
 */
async function addItem(item) {
  const response = await fetch('/api/insertData', {
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
      await addItem({ recipeTitle: titleRouter, recipeDescription: newDescription });
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


