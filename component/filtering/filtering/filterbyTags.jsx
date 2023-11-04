import { useEffect, useState } from "react";
import CustomizedHook from "./filterForm";


export default function FilterbyTags(){

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

  return <CustomizedHook options={tags}/>
}