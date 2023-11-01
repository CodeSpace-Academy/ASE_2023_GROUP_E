import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';




const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const optionRef = useRef()


  useEffect(() => {
    fetch('/api/filtering/categories')
      .then(res => res.json())
      .then(data => setCategories(data.categories && data.categories[0].categories))
  })

  const router = useRouter()

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

    
      <form onSubmit={(e) => {
        e.preventDefault()
        console.log(optionRef && optionRef.current.value)
        router.replace(`/categories/${optionRef.current.value}`)
        console.log('sent')
       
       
      }}>
        <select ref={optionRef}>
          {categories && categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>


        <button>filter</button>
      </form>
 
    </>
  );
};




export default SearchBar;