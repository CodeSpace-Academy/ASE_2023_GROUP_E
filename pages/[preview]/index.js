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

  return (
    <main>

      <PreviewList recipes={results}/*  click={loadMoreRecipes}  *//>
      
      <button onClick={() => localStorage.setItem("skipNo", addSkip + 50)} disabled={false}>
        Next
      </button>
     
      {/* <button>Page: {pageNumber}</button> */}
    </main>
  );
}
