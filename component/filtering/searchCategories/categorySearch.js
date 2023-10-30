import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';




const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [noRecipesMessage, setNoRecipesMessage] = useState('');
  const optionRef = useRef()
  const router = useRouter()

  useEffect(() => {
    fetch('/api/filtering/categories')
      .then(res => res.json())
      .then(data => setCategories(data && data.categories[0].categories))
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCategory = optionRef.current.value;
    const hasRecipes = true; 

    if (!hasRecipes) {
      setNoRecipesMessage(`No recipes found for category: ${selectedCategory}`);
    } else {
      setNoRecipesMessage('');
      router.replace(`/categories/${selectedCategory}`);
    }
  };

  

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
       {noRecipesMessage && <p>{noRecipesMessage}</p>}
    </>
  );
};




export default SearchBar;