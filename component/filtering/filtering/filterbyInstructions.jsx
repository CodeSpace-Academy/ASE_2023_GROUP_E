import { useEffect, useState } from "react";
import StateContext from "@/useContext/StateContext";

export default function FilterbyInstructions() {
  const { setFilteredResults, total, setTotal, setSelectedInstructionsOptions, selectedInstructionsOptions } = StateContext();
  const [instructions, setInstructions] = useState([]);




 


  return (
    <div>
      <h4>Filter Instructions:</h4>
      <input
        type="number"
        
      />
    </div>
  );
}
