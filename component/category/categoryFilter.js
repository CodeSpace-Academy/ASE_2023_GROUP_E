import React, { useState, useEffect } from 'react';

export default function CategoryFilter({ onCategoryChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    onCategoryChange(category);
  };

  return (
    <select onChange={handleCategoryChange}>
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
