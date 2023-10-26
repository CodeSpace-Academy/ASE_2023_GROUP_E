import PreviewList from '@/component/Recipes/Preview/PreviewList';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AllRecipes() {
  const router = useRouter();
  const [ results, setResults] = useState(null)
  let addSkip
  
  useEffect(() => {

    const skipNo = parseInt(localStorage.getItem("skipNo"))
    addSkip = skipNo
    fetch(`/api/recipes/preview?skip=${skipNo && skipNo}`)
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

      <PreviewList recipes={results}/*  click={loadMoreRecipes}  *//>
      
      <button onClick={() => {
        localStorage.setItem("skipNo", addSkip + 50)
        scrollToTop()
        }} disabled={false}>
        Next
      </button>
     
      {/* <button>Page: {pageNumber}</button> */}
    </main>
  );
}
