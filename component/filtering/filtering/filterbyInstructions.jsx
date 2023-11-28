import React, { useEffect, useState } from 'react';
import StateContext from '../../../useContext/StateContext';
import classes from './instructions.module.css'
export default function FilterbyInstructions() {
  const {
    setSelectedInstructionsOptions,
    selectedInstructionsOptions,
  } = StateContext();

  const handleInputChange = (event) => {

    setSelectedInstructionsOptions(event.target.value)
    console.log(selectedInstructionsOptions)
  };

  return (
    <div className={classes.instructionsInput}>
      <h4  className={classes.title}style={{color:'white'}}>Instructions:</h4>
      {/* Input for entering the number of instructions */}
      <input
      className={classes.input}
        type="number"
        id="instruction"
        value={
          selectedInstructionsOptions.length > 0
            ? selectedInstructionsOptions[0].value
            : ''
        }
        onChange={handleInputChange}
        min={0}
      />
    </div>
  );
}
