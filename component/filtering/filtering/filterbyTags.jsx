import { useEffect, useState } from "react";
import CustomizedHook from "./filterForm";
import { useRouter } from "next/router";
import StateContext from "@/useContext/StateContext";

export default function FilterbyTags(){
  const { setSelectedTags, selecteTags} = StateContext()

  const [tags, setTags] = useState([]);
  
  /**
   * after fetching the tags which is an array of arrays
   * it is  then combined into one array.
   * This array is then checked to remove duplicates before insering it into a state.
   * 
   * This state hold the options of tags to select from.
   */
  useEffect(() =>{
    fetch('/api/getData?project=tags&collection=recipes')
      .then(res => res.json())
      .then(data => {
        if (data) {
          const allTags = data.results && data.results.reduce((tags, recipe) => {
            return tags.concat(recipe.tags);
          }, []);
    
          const uniqueTags = [...new Set(allTags)];
          setTags(uniqueTags);
        }
      })
  }, [tags])

  const handleSelectChange = (selected) => {
    setSelectedTags(selected)
  };

  return (
    <CustomizedHook 
      options={tags} 
      filter={'Tags'} 
      handleSelectChange={handleSelectChange} 
      selectedOptions={selecteTags} 
    />
  )
}
