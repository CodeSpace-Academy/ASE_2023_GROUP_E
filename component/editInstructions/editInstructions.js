import StateContext from '@/useContext/StateContext';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import classes from './editDescription.module.css'
import Button, { FormButton } from '../Button/button';
import { addItem } from '@/database/addToDatabase';

function EditInstruction({info}) {
  const [newInstruction, setNewInstruction] = useState(info);
  const { editInstruction, setEditInstruction, instructionIndex }= StateContext()


  const router = useRouter()
  const titleRouter = router.query.recipe


  async function addItemHandler(e) {
    e.preventDefault()




    try {
      await addItem('/api/editInstructions', { recipeTitle: titleRouter, recipeInstruction: newInstruction, selectInstruction: instructionIndex });
      //hides form after editing
      setEditInstruction(!editInstruction)
    } catch (error) {
      console.log('Error adding item');
    }
  }
 
  return (
    <form className={classes.form} onSubmit={addItemHandler}>
      <textarea
        value={newInstruction}
        onChange={(e) => setNewInstruction(e.target.value)}
      />
      <div className={classes.buttons}>
        <FormButton text={'SAVE'}/>
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
    <form className={classes.optionsForm}>
      <select ref={option} className={classes.select}>
        {
          instructions.map((instructions, index) => <option key={index} value={index} >{index  +1}</option>)
        }
      </select>

      <Button text={'Edit Instruction'}  color={'success'} click={optionHandler} />
    </form>
  )
}

export function NewInstruction() {
  const [newInstruction, setNewInstruction] = useState('');
  const { addInstruction, setAddInstruction }= StateContext()


  const router = useRouter()
  const titleRouter = router.query.recipe


  async function addItemHandler(e) {
    e.preventDefault()


    try {
      await addItem('/api/addNewInstruction', { recipeTitle: titleRouter, recipeInstruction: newInstruction });
      setAddInstruction(!addInstruction)
    } catch (error) {
      console.log('Error adding item');
    }
  }
 
  return (
    <form className={classes.form} onSubmit={addItemHandler}>
      <textarea
        value={newInstruction}
        onChange={(e) => setNewInstruction(e.target.value)}
        required
      />
      <div className={classes.buttons}>
        {/* <Button text={'Add Instruction'} color={'success'} /> */}
        <Button text={'CLOSE'} color={'warning'} click={() => setAddInstruction(!addInstruction)}/>
        <FormButton text={'ADD'}/>
      </div>
    </form>
  );
}
