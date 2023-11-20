import StateContext from "@/useContext/StateContext";
import { useEffect, useState } from "react";
import CustomizedHook from "./filterForm";
import { WhiteButton } from "@/component/Button/button";
import { useRouter } from "next/router";

export default function FilterbyIngredients({skipNo, sortField, sortOrder}){

  const [ingredients, setIngredients] = useState([]);
  const { push } = useRouter()
  const { setSelectedIngredients, selecteTags, selectedIngredients, selectedCategory, selectedInstructionsOptions, andOr, setAndOr } = StateContext();
 
  useEffect(() =>{
    fetch('/api/getData?project=ingredients&collection=recipes')
      .then(res => res.json())
      .then(data => {
        if (data) {

          /**
           * Fetches the ingredients which is an array objects.
           * maps over this array to abstracts the object keys
           */
          const allIngredients = data.results && data.results.map((item) => {
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
    setSelectedIngredients(selected); 
  };

  return (

  <>

    <CustomizedHook 
      options={ingredients} 
      filter={'Ingredients'}
      handleSelectChange={handleSelectChange}
      selectedOptions={selectedIngredients} 
    />
    <br/>

    <WhiteButton  
      click={() => {
        push(`recipes-${skipNo}-${sortField}-${sortOrder}_${selecteTags.map((item) => item.label).join(',')}_${selectedIngredients.map((item) => item.label).join(',')}_${selectedCategory == '' ? selectedCategory : selectedCategory.value}_${selectedInstructionsOptions}_${!andOr}`)
        setAndOr(!andOr)
      }}
      text={andOr ? 'Includes all' : 'Includes one'}
    />
  </>
  )
}
