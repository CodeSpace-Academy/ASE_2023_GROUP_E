import { useEffect, useState } from "react";
import CustomizedHook from "./filterForm";
import { useRouter } from "next/router";
import StateContext from "@/useContext/StateContext";

export default function FilterbyTags(){

  // const { setFilteredResults, filteredResults, total, setTotal, setSelectedTagsOptions, selectedTagsOptions } = StateContext()
  const { setSelectedTags, selecteTags} = StateContext()

  const [tags, setTags] = useState([]);
  const {push} = useRouter()
  
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
          const allTags = data.recipes && data.recipes.reduce((tags, recipe) => {
            return tags.concat(recipe.tags);
          }, []);
    
          const uniqueTags = [...new Set(allTags)];
          setTags(uniqueTags);
        }
      })
  }, [tags])

  const handleSelectChange = (selected) => {

    setSelectedTags(selected)
    console.log(selected.map((item) => item.label))
    // setSelectedTagsOptions(selected);
  };

  // const selected = selectedTagsOptions.map((item) => item.value).join(',')

  // useEffect(() => {
  //     fetch(`/api/filtering/filterOptions/filterTags?selected=${selected}`)
  //       .then(res => res.json())
  //       .then(data => {
  //         setFilteredResults(data.recipes && data.recipes[0])
  //         setTotal(total + data.recipes && data.recipes[1])
  //       })
  // }, [selectedTagsOptions])

  return (
    <CustomizedHook 
      options={tags} 
      filter={'Tags'} 
      handleSelectChange={handleSelectChange} 
      // selectedOptions={selectedTagsOptions} 
      selectedOptions={selecteTags} 
    />
  )
}
