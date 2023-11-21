
import { useEffect, useState } from 'react';
import Select from 'react-select'; // Import react-select
import StateContext from '@/useContext/StateContext';

const SearchBar = () => {
  const [categories, setCategories] = useState([]);
  const { selectedCategory, setSelectedCategory } = StateContext();

  useEffect(() => {
    // Fetch categories on component mount
    fetch('/api/getData?collection=categories')
      .then((res) => res.json())
      .then((data) =>
        setCategories(data.results && data.results[0].categories)
      );
  }, []);

  const handleCategoryChange = (selectedOption) => {
 
    setSelectedCategory(selectedOption)
  };

 

  return (
    <div>
      <form className="previewMain">
        <h4 style={{color:'white'}}>Category</h4>
        <Select
          options={
            categories &&
            categories.map((item) => ({ value: item, label: item }))
          }
          value={selectedCategory}
          onChange={handleCategoryChange}
          placeholder="Select a category"
        />
      </form>
    </div>
  );
};

export default SearchBar;
