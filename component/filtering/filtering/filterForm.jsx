import React, { useEffect, useState } from 'react';
import Select from 'react-select';

function CustomizedHook() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [tags, setTags] = useState([]);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

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

  const y = ["Dessert", "Healthy", "Weeknight"]

  useEffect(() => {
    fetch(`/api/filtering/filterOptions/filterTags?tags=${selectedOptions.map((item) => item.value).join(',')}`)
      .then(res => res.json())
      .then(data => console.log(data.recipes))
  })

  // useEffect(() => {
  //   console.log(selectedOptions.map((item) => item.value))
  // })

  return (
    <div>
      <h2>Filter Tags</h2>
      <Select
        options={tags.map((option) => ({ value: option, label: option }))}
        isMulti
        value={selectedOptions}
        onChange={handleSelectChange}
      />

    </div>
  );
}

export default CustomizedHook;


