import StateContext from '@/useContext/StateContext';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import classes from './editDescription.module.css'
import Button from '../Button/button';
import { addItem } from '@/database/addToDatabase';

function EditInstruction({info}) {
  const [newInstruction, setNewInstruction] = useState(info);
  const { editInstruction, setEditInstruction, instructionIndex }= StateContext()


  const router = useRouter()
  const titleRouter = router.query.recipe


  async function addItemHandler(e) {
    e.preventDefault()

    //hides form after editing
    setEditInstruction(!editInstruction)


    try {
      await addItem('/api/editInstructions', { recipeTitle: titleRouter, recipeInstruction: newInstruction, selectInstruction: instructionIndex });
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

/**
 * 
 * maps over the instruction to calculate the amount of instruction
 * then we will have that amout as the number of option we have
 * 
 * the selected option is the set inside {@link setInstructionIndex} which is a global state, that will then be used to target a specific recipe to edit by using its index
 */

export function GetSpecificInstruction({instructions}){

  const option = useRef()
  const { setInstructionIndex, setEditInstruction } = StateContext()

  function optionHandler(e){
    e.preventDefault()
    setInstructionIndex(option.current.value)
    setEditInstruction(true)
  }

  return(
    <form>
      <select ref={option}>
        {
          instructions.map((instructions, index) => <option key={index} value={index} >{index  +1}</option>)
        }
      </select>

      <Button text={'Edit Instruction'}  color={'success'} click={optionHandler} />
    </form>
  )
}


//Make and share this Low-Fat Berry Blue Frozen Dessert recipe from Food.com.


