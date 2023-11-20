import StateContext from '@/useContext/StateContext';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import classes from './editDescription.module.css'
import Button, { FormButton } from '../Button/button';
import {TiEdit } from 'react-icons/ti'

function EditInstruction({info}) {
  const [newInstruction, setNewInstruction] = useState(info);
  const { editInstruction, setEditInstruction, instructionIndex }= StateContext()
  const instructionKey = `instructions.${instructionIndex}`

  const router = useRouter()
  const idRouter = router.query.recipe

  async function addItemHandler(e) {
    e.preventDefault()

    try {
      await addItem('/api/editRecipe', { recipeId: idRouter, recipeValue: newInstruction, key: instructionKey, stage: '$set' });
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

      <Button text={<TiEdit  fontSize={'25px'}/>}   click={optionHandler} />
    </form>
  )
}

export function NewInstruction() {
  const [newInstruction, setNewInstruction] = useState('');
  const { addInstruction, setAddInstruction }= StateContext()

  const router = useRouter()
  const idRouter = router.query.recipe

  async function addItemHandler(e) {
    e.preventDefault()

    try {
      await addItem('/api/editRecipe', { recipeId: idRouter, recipeValue: newInstruction, key: 'instructions', stage: '$push' });
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