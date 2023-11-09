import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classes from './category.module.css';
import Select from 'react-select'; // Import react-select
import { BlueButton } from '@/component/Button/button';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [noRecipesMessage, setNoRecipesMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/filtering/categories')
      .then((res) => res.json())
      .then((data) =>
        setCategories(data.categories && data.categories[0].categories),
      );
  }, []);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  useEffect(() => {
    if (selectedCategory) {
      const categoryValue = selectedCategory.value;
      router.replace(`/categories/${categoryValue}`);
      console.log('re-rendering');
    }
  });

  return (
    <>
      {/* <div className={classes.background}></div> */}

      <div>
        <form className="previewMain">
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
    </>
  );
};

export default SearchBar;
