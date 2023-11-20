import React, { useEffect, useState } from 'react';
import StateContext from '../../../useContext/StateContext';

export default function FilterbyInstructions() {
  const {
    setFilteredResults,
    setTotal,
    setSelectedInstructionsOptions,
    selectedInstructionsOptions,
  } = StateContext();

  const [instructions, setInstructions] = useState([]);

  // Fetches instructions data from the server 
  useEffect(() => {
    fetch('/api/filtering/filterOptions/selectOptions?object=instructions')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setInstructions(data.instructions);
        }
      });
  }, []);

  // Handle input change event
  const handleInputChange = (event) => {
    // Convert input value to integer
    const selectedValue = parseInt(event.target.value, 10);
    // Updates selected instructions options
    setSelectedInstructionsOptions([
      { value: selectedValue, label: selectedValue },
    ]);
  };

  // Fetches filtered results when selected instructions change
  useEffect(() => {
    // Get the selected value
    const selectedValue =
      selectedInstructionsOptions.length > 0
        ? selectedInstructionsOptions[0].value
        : null;

    // Fetches data based on selected value
    if (selectedValue !== null) {
      fetch(
        `/api/filtering/filterOptions/filterInstructions?selected=${selectedValue}`,
      )
        .then((res) => res.json())
        .then((data) => {
          // Updates state with filtered results
          if (data && data.recipes) {
            setFilteredResults(data.recipes[0]);
            setTotal(data.recipes[1] || 0);
          }
        });
    } else {
      // If no value selected, reset filtered results
      setFilteredResults([]);
      setTotal(0);
    }
  }, [selectedInstructionsOptions, setFilteredResults, setTotal]);

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
