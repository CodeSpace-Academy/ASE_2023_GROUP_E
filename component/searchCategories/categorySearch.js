import { useState } from 'react';
import Link from 'next/link';


const SearchBar = () => {
  const [query, setQuery] = useState('');
  
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  }

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