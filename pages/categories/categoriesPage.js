// pages/search.js
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';

const Search = () => {
  const [results, setResults] = useState([]);

  const handleSearch = async (category) => {
    try {
      const response = await fetch(`/api/recipes?category=${category}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div>
      <h1>Recipe Search</h1>
      <SearchBar onSearch={handleSearch} />
      <RecipeList recipes={results} />
    </div>
  );
};

export default Search;
