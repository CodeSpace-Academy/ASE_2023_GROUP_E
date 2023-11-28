import { useEffect, useState } from 'react';
import Select from 'react-select'; // Import react-select
import StateContext from '@/useContext/StateContext';

/**
 * SearchBar component to allow users to select a category for filtering recipes.
 * @returns {JSX.Element} - Returns a form with a Select dropdown for choosing a category.
 */
const SearchBar = () => {
  // State to store the available categories
  const [categories, setCategories] = useState([]);
  
  // Accessing selectedCategory and setSelectedCategory from StateContext
  const { selectedCategory, setSelectedCategory } = StateContext();

  // Fetch categories on component mount
  useEffect(() => {
    fetch('/api/getData?collection=categories')
      .then((res) => res.json())
      .then((data) =>
        setCategories(data.results && data.results[0].categories)
      );
  }, []);

  /**
   * Handler for category selection change.
   * @param {Object} selectedOption - The selected category option from the dropdown.
   */
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  return (
    <div>
      {/* Form for category selection */}
      <form className="previewMain">
        <h4 style={{ color: 'white' }}>Category</h4>
        {/* Select dropdown for choosing a category */}
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
