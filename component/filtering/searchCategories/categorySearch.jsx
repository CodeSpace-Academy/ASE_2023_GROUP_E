
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select'; // Import react-select
import StateContext from '@/useContext/StateContext';

const SearchBar = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { setFilteredResults } = StateContext();

  useEffect(() => {
    // Fetch categories on component mount
    fetch('/api/filtering/categories')
      .then((res) => res.json())
      .then((data) =>
        setCategories(data.categories && data.categories[0].categories)
      );
  }, []);

  const handleCategoryChange = (selectedOption) => {
    if (selectedOption) {
      const newUrl = `/findstay?category=${selectedOption.label}`;
  
      // Update the URL with the selected category
      window.history.pushState({ category: selectedOption.label }, '', newUrl);
  
      // Update the state with the selected category
      setSelectedCategory(selectedOption);
    }
  };

  useEffect(() => {
    // Fetch filtered results when selected category changes
    if (selectedCategory && selectedCategory.label) {
      fetch(
        `/api/filtering/filterOptions/filteredCategories?category=${selectedCategory.label}`
      )
        .then((res) => res.json())
        .then((data) => setFilteredResults(data.categories.recipes || []));
    }
  }, [selectedCategory]);

  useEffect(() => {
    // Read the URL parameters on page load
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    // Update the state with the category from URL
    if (categoryParam) {
      const selectedOption = categories.find((item) => item === categoryParam);
  
      if (selectedOption) {
        setSelectedCategory({ value: categoryParam, label: categoryParam });
      }
    }
  }, [categories]);

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
