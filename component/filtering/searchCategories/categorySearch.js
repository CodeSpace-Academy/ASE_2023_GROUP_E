import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classes from './category.module.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [noRecipesMessage, setNoRecipesMessage] = useState('');
  const optionRef = useRef();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/filtering/categories')
      .then((res) => res.json())
      .then((data) =>
        setCategories(data.categories && data.categories[0].categories),
      );
  });

  return (
    <>
      {/* Enables the user to search with category*/}
      <div className={classes.background}>
        <div className={classes.text}>All Recipes</div>

        <div className={classes.search}>
          <form>
            <input
              className={classes.input}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter category..."
            />

            <Link href={`/categories/${query}`}>
              <button className={classes.button}>Search</button>
            </Link>
          </form>
        </div>
      </div>

      <div>
        <form className='previewMain'
          onSubmit={(e) => {
            e.preventDefault();
            console.log(optionRef && optionRef.current.value);
            router.replace(`/categories/${optionRef.current.value}`);
            console.log('sent');
          }}
        >
          {/* gives user the option to select a category */}
          <select ref={optionRef}>
            {categories &&
              categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>

          <button>Filter categories</button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
