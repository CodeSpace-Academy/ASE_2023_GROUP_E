// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import classes from './category.module.css';
// import Select from 'react-select'; // Import react-select
// import { BlueButton } from '@/component/Button/button';
// import StateContext from '@/useContext/StateContext';

// const SearchBar = () => {
//   const [query, setQuery] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [noRecipesMessage, setNoRecipesMessage] = useState('');
//   const router = useRouter();
//   const { setFilteredResults, filteredResults  } = StateContext()

//   useEffect(() => {
//     fetch('/api/filtering/categories')
//       .then((res) => res.json())
//       .then((data) =>
//         setCategories(data.categories && data.categories[0].categories),
//       );
//   }, []);

//   const handleCategoryChange = (selectedOption) => {
//     setSelectedCategory(selectedOption);
//   };

//   useEffect(() => {
//     if(selectedCategory && selectedCategory.label){
//       fetch(`/api/filtering/filterOptions/filteredCategories?category=${selectedCategory && selectedCategory.label}`)
//       .then(res => res.json())
//       .then(data => setFilteredResults(data.categories.recipes))
//     }
//   }, [selectedCategory])

//   return (
//     <>
//       {/* <div className={classes.background}></div> */}

//       <div>
//         <form className="previewMain">
//           <Select
//             options={
//               categories &&
//               categories.map((item) => ({ value: item, label: item }))
//             }
//             value={selectedCategory}
//             onChange={handleCategoryChange}
//             placeholder="Select a category"
//           />
//         </form>
//       </div>
//     </>
//   );
// };

// export default SearchBar;


import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classes from './category.module.css';
import Select from 'react-select';
import { BlueButton } from '@/component/Button/button';
import StateContext from '@/useContext/StateContext';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [noRecipesMessage, setNoRecipesMessage] = useState('');
  const router = useRouter();
  const { setFilteredResults, filteredResults } = StateContext();

  // Fetch categories on component mount
  useEffect(() => {
    fetch('/api/filtering/categories')
      .then((res) => res.json())
      .then((data) =>
        setCategories(data.categories && data.categories[0].categories)
      );
  }, []);

  // Handle category change
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  // Fetch filtered results when selected category changes
  useEffect(() => {
    if (selectedCategory && selectedCategory.label) {
      fetch(
        `/api/filtering/filterOptions/filteredCategories?category=${selectedCategory && selectedCategory.label}`
      )
        .then((res) => res.json())
        .then((data) => setFilteredResults(data.categories.recipes));
    }
  }, [selectedCategory]);

  // Update the URL when the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      const newUrl = `/findstay?category=${selectedCategory.label}`;
      window.history.replaceState(
        { ...window.history.state, as: newUrl, url: newUrl },
        '',
        newUrl
      );
    }
  }, [selectedCategory]);

  return (
    <>
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
