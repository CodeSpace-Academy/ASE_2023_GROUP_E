import { useEffect, useState } from "react";
import CustomizedHook from "./filterForm";
import { useRouter } from "next/router";
import StateContext from "@/useContext/StateContext";

export default function FilterbyTags(){
  const { setSelectedTags, selecteTags} = StateContext()

  const [tags, setTags] = useState([]);
  
  /**
 * FilterbyTags component for filtering recipes by tags.
 * @type {Array<string>}
 * @component
 * @returns {JSX.Element} JSX element representing the FilterbyTags component.
 * 
 */
 /**
   * Fetch tags data from the server and update the component state.
   * @function
   * @name useEffect
   * @param {Array} tags - The current state of tags.
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
