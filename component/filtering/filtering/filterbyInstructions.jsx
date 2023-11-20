import React, { useEffect, useState } from 'react';
import StateContext from '../../../useContext/StateContext';

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
    <div>
      <h4 style={{color:'white'}}>Instructions:</h4>
      {/* Input for entering the number of instructions */}
      <input
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
