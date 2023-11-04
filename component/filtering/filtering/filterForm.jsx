import React, { useEffect, useState } from 'react';
import Select from 'react-select';

function CustomizedHook({options}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [tags, setTags] = useState([]);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };



  const i ='filterTags?tags'

  useEffect(() => {
    fetch(`/api/filtering/filterOptions/${i}=${selectedOptions.map((item) => item.value).join(',')}`)
      .then(res => res.json())
      .then(data => console.log(data.recipes))
  })

  return (
    <div>
      <h2>Filter Tags</h2>
      <Select
        options={ options && options.map((option) => ({ value: option, label: option }))}
        isMulti
        value={selectedOptions}
        onChange={handleSelectChange}
      />

    </div>
  );
}

export default CustomizedHook;


