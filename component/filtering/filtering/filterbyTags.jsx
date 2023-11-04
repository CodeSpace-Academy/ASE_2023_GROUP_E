import { useEffect, useState } from "react";
import CustomizedHook from "./filterForm";
import StateContext from "@/useContext/StateContext";

export default function FilterbyTags(){

  const { setFilteredResults, filteredResults } = StateContext()

  const [tags, setTags] = useState([]);
  useEffect(() =>{
    fetch('/api/filtering/tags')
      .then(res => res.json())
      .then(data => {
        if (data) {
          const allTags = data.recipes.reduce((tags, recipe) => {
            return tags.concat(recipe.tags);
          }, []);
    
          const uniqueTags = [...new Set(allTags)]; 
          setTags(uniqueTags);
        }
      })
  }, [tags])


  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const selected = selectedOptions.map((item) => item.value).join(',')

  useEffect(() => {
    fetch(`/api/filtering/filterOptions/filterTags?tags=${selected}`)
      .then(res => res.json())
      .then(data => {
        console.log(filteredResults.length > 0)
        setFilteredResults(data && data.recipes)
      })
  }, [filteredResults])

  return <CustomizedHook options={tags} handleSelectChange={handleSelectChange} selectedOptions={selectedOptions} />
}