import { useEffect, useState } from "react";
import CustomizedHook from "./filterForm";
import StateContext from "@/useContext/StateContext";

export default function FilterbyTags(){

  const { setFilteredResults, filteredResults, total, setTotal } = StateContext()

  const [tags, setTags] = useState([]);
  
  /**
   * after fetching the tags which is an array of arrays
   * it is  then combined into one array.
   * This array is then checked to remove duplicates before insering it into a state.
   * 
   * This state hold the options of tags to select from.
   */
  useEffect(() =>{
    fetch('/api/filtering/filterOptions/selectOptions?object=tags')
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
      fetch(`/api/filtering/filterOptions/filterTags?selected=${selected}`)
        .then(res => res.json())
        .then(data => {
          setFilteredResults(data && data.recipes[0])
          setTotal(total + data && data.recipes[1])
          const newUrl = `/findstay?tags=${selected}`; // Use the 'page' variable
          window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
        })
  }, [selectedOptions])

  return (
    <CustomizedHook 
      options={tags} 
      filter={'Filter Tags'} 
      handleSelectChange={handleSelectChange} 
      selectedOptions={selectedOptions} 
    />
  )
}