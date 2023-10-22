import StateContext from '@/useContext/StateContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import classes from './editDescription.module.css'
import Button from '../Button/button';
import { addItem } from '@/database/fetchUsingApiFile';

function EditInstruction({info}) {
  const [newInstruction, setNewInstruction] = useState(info);
  const { editInstruction, setEditInstruction }= StateContext()


  const router = useRouter()
  const titleRouter = router.query.recipe


  async function addItemHandler(e) {
    e.preventDefault()

    //hides form after editing
    setEditInstruction(!editInstruction)


    try {
      await addItem('/api/editInstructions', { recipeTitle: titleRouter, recipeInstruction: newInstruction });
    } catch (error) {
      console.log('Error adding item');
    }
  }
 
  return (
    <form className={classes.form}>
      <textarea
        value={newInstruction}
        onChange={(e) => setNewInstruction(e.target.value)}
      />
      <div className={classes.buttons}>
        <Button text={'SAVE'} color={'success'} click={addItemHandler}/>
        <Button text={'CLOSE'} color={'warning'} click={() => setEditInstruction(!editInstruction)}/>
      </div>
    </form>
  );
}


export default EditInstruction;


//Make and share this Low-Fat Berry Blue Frozen Dessert recipe from Food.com.


