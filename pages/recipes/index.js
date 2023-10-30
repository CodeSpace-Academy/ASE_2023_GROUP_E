import PreviewList from '@/component/Recipes/Preview/PreviewList';
import { useState, useEffect } from 'react';
import SearchBar from '@/component/searchCategories/categorySearch';
import {MdSkipNext} from 'react-icons/md'


export default function AllRecipes() {
  const [ results, setResults] = useState(null)
  let addSkip
 
  useEffect(() => {


    const skipNo = parseInt(localStorage.getItem("skipNo"))
    addSkip = skipNo
    fetch(`/api/recipes/preview?skip=${skipNo && skipNo}&limit=${50}`)
      .then(res => res.json())
      .then(data => setResults(data.recipes))
  })

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'instant', // Smooth scrolling animation
    });
  };

  return (
    <main>
      <SearchBar />
      <PreviewList recipes={results}/*  click={loadMoreRecipes}  *//>


     <MdSkipNext onClick={() => {
        localStorage.setItem("skipNo", addSkip + 50)
        scrollToTop()
        }} disabled={false}/>
     
      {/* <button>Page: {pageNumber}</button> */}
    </main>
  );
}
