import StateContext from "@/useContext/StateContext";
import { useEffect, useState } from "react";
import CustomizedHook from "./filterForm";
import { WhiteButton } from "@/component/Button/button";

export default function FilterbyIngredients(){

  // const { setFilteredResults, filteredResults, total, setTotal, selectedIngredientsOptions, setSelectedIngredientsOptions  } = StateContext()
  const { selectedIngredients, setSelectedIngredients  } = StateContext()
  const [ingredients, setIngredients] = useState([]);
  
  /**
   * Used to swicth filtering with $and and with $or using a boolean
   */
  const [andOr, setAndOr] = useState(false)
 
  useEffect(() =>{
    fetch('/api/filtering/filterOptions/selectOptions?object=ingredients')
      .then(res => res.json())
      .then(data => {
        if (data) {

          /**
           * Fetches the ingredients which is an array objects.
           * maps over this array to abstracts the object keys
           */
          const allIngredients = data.recipes && data.recipes.map((item) => {
              return Object.keys(item.ingredients)
          })
          /**
           * {@link allIngredients} is an array of arrays
           * which is then combined
           */
          const slitIngredients = allIngredients && allIngredients.join().split(',')
          /**
           * The combined array is then checked to remove any duplicates
           * then sent into a state 
           */
          const uniqueIngredients = [...new Set(slitIngredients)];
          setIngredients(uniqueIngredients);
        }
      });
  }, [ingredients]);

  const handleSelectChange = (selected) => {
    // setSelectedIngredientsOptions(selected); 
    setSelectedIngredients(selected); 
  };

  // const selected = selectedIngredientsOptions.map((item) => item.value).join(',')

  // useEffect(() => {
  //   if(selectedIngredientsOptions.length > 0){
  //     fetch(`/api/filtering/filterOptions/filterIngredients?selected=${selected}&andOr=${andOr ? '$or' : '$and'}`)
  //       .then(res => res.json())
  //       .then(data => {
  //         setFilteredResults(data && data.recipes[0]);
  //         setTotal(total + data && data.recipes[1]);
      
  //       });
  //   }
  // }, [selectedIngredientsOptions, andOr, total, selected])

  return (

  <>

    <CustomizedHook 
      options={ingredients} 
      filter={'Ingredients'}
      handleSelectChange={handleSelectChange}
      selectedOptions={selectedIngredients} 
      // selectedOptions={selectedIngredientsOptions} 
    />
    <br/>

    <WhiteButton  
      click={() => setAndOr(!andOr)}
      text={andOr ? 'Includes all' : 'Includes one'}
    />
  </>
  )
}
