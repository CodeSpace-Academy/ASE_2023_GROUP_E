import { useEffect, useState } from "react";
import StateContext from "@/useContext/StateContext";

export default function FilterbyInstructions() {
  const { setFilteredResults, total, setTotal, setSelectedInstructionsOptions, selectedInstructionsOptions } = StateContext();
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    fetch('/api/filtering/filterOptions/selectOptions?object=instructions')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setInstructions(data.instructions);
        }
      })
  }, []);


  useEffect(() => {
    const selectedValue = selectedInstructionsOptions.length > 0 ? selectedInstructionsOptions[0].value : null;
    
    if (selectedValue !== null) {
      fetch(`/api/filtering/filterOptions/filterInstructions?selected=${selectedValue}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.recipes) {
            setFilteredResults(data.recipes[0]);
            setTotal(data.recipes[1] || 0);
          }
        });
    } else {

      setFilteredResults([]);
      setTotal(0);
    }
  }, [selectedInstructionsOptions]);


  return (
    <div>
      <h4>Filter Instructions:</h4>
      <input
        type="number"
        
      />
    </div>
  );
}
