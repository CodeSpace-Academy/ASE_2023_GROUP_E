import { useState } from 'react';
import Link from 'next/link';


const SearchBar = () => {
  const [query, setQuery] = useState('');
//   const [result, setResults] = useState('');
//   const handleSearch = async (category) => {
//     try {
//       const response = await fetch(`/api/recipes?category=${category}`);
//       const data = await response.json();
//       setResults(data);
//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//     }
//   };


  return (
    <>
    <form >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter category..."
      />
      <Link href={`/categories/${query}`}>
      <button>Search</button>
      </Link>
    </form>
    </>
  );
};


export default SearchBar;