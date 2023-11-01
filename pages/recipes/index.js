import PreviewList from '@/component/Recipes/Preview/PreviewList';
import { useState, useEffect } from 'react';
import SearchBar from '@/component/filtering/searchCategories/categorySearch';
import {GrChapterNext} from 'react-icons/gr'


export default function AllRecipes() {
  const [ results, setResults] = useState(null)
  const [ sortDate, setSortDate ] = useState('title')
  const [ sortIn, setSortIn ] = useState(false)
  const [ addSkip, setAddSkip ] = useState(0)
 
  useEffect(() => {
    const skipNo = parseInt(localStorage.getItem("skipNo"))
    setAddSkip(skipNo)
    fetch(`/api/recipes/preview?skip=${skipNo && skipNo}&limit=${50}&sort=${sortDate}&sortIn=${sortIn ? -1 : 1}`)
      .then(res => res.json())
      .then(data => setResults(data.recipes))
  }, [sortIn, addSkip, sortDate])

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'instant', // Smooth scrolling animation
    });
  };

  return (
    <main>
      <SearchBar />
      <PreviewList sortDate={() => {
        setSortDate('published')
        setSortIn(!sortIn)
        
        }} recipes={results}/*  click={loadMoreRecipes}  *//>

     <GrChapterNext color='light gray' fontSize='24px'  onClick={() => {
        localStorage.setItem("skipNo", addSkip + 50)
        scrollToTop()
        }} disabled={false}/>
     
      {/* <button>Page: {pageNumber}</button> */}
    </main>
  );
}
