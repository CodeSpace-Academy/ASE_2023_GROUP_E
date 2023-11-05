import StateContext from "@/useContext/StateContext";
import { useEffect, useState } from "react";
import CustomizedHook from "./filterForm";

export default function FilterbyIngredients(){

  const { setFilteredResults, filteredResults } = StateContext()
  const [ingredients, setIngredients] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
 
  useEffect(() =>{
    fetch('/api/filtering/filterOptions/selectOptions?object=ingredients')
      .then(res => res.json())
      .then(data => {
        if (data) {

          /**
           * Fetches the ingredients which is an array objects.
           * maps over this array to abstracts the object keys
           */
          const allIngredients = data.recipes.map((item) => {
              return Object.keys(item.ingredients)
          })
          /**
           * {@link allIngredients} is an array of arrays
           * which is then combined
           */
          const slitIngredients = allIngredients.join().split(',')
          /**
           * The combined array is then checked to remove any duplicates
           * then sent into a state 
           */
          const uniqueIngredients = [...new Set(slitIngredients)];
          setIngredients(uniqueIngredients);
        }
      })
  }, [ingredients])

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const selected = selectedOptions.map((item) => item.value).join(',')

  useEffect(() => {
    fetch(`/api/filtering/filterOptions/filterIngredients?selected=${selected}`)
      .then(res => res.json())
      .then(data => {
        console.log(data && data.recipes || [])
      })
  }, [filteredResults])

  return (
    <CustomizedHook 
      options={ingredients} 
      filter={'Filter Ingredients'}
      handleSelectChange={handleSelectChange}
      selectedOptions={selectedOptions} 
    />
  )
}