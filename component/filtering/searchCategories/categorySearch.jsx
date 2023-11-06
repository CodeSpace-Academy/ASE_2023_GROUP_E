/* eslint-disable react/button-has-type */
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const optionRef = useRef();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/filtering/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data.categories && data.categories[0].categories));
  }, []);

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        // console.log(optionRef && optionRef.current.value);
        router.replace(`/categories/${optionRef.current.value}`);
        // console.log('sent');
      }}
      >
        {/* gives user the option to select a category */ }
        <select ref={optionRef}>
          {categories && categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>

        <button>filter</button>
      </form>

    </>
  );
}

export default SearchBar;
