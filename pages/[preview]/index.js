import PreviewList from '@/component/Recipes/Preview/PreviewList';
import { run } from '@/database';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function AllRecipes({ documents, pagesPath, totalDataLength }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(pagesPath);
  const recipesToLoad = 12;
  const [loadMoreValue, setLoadMoreValue] = useState(totalDataLength - currentPage);
  const [pageNumber, setPageNumber] = useState(1); // Initialize page number

  useEffect(() => {
    // Calculate the page number based on the URL whenever it changes
    const page = Math.ceil(pagesPath / recipesToLoad);
    setPageNumber(page);
  }, [pagesPath]);

  const loadMoreRecipes = () => {
    // Calculate the number of recipes to load for the next page
    const nextPage = currentPage + recipesToLoad;
    setCurrentPage(nextPage);

    // Calculate the new value based on the updated currentPage and recipesToLoad
    const newLoadMoreValue = totalDataLength - nextPage;
    setLoadMoreValue(newLoadMoreValue);

    // Navigate to the next page with the appropriate number of recipes to load
    router.push(`/${nextPage}`);
  };

  const goBack = () => {
    // Decrease the page number
    if (pageNumber > 1) {
      const prevPage = currentPage - recipesToLoad;
      setCurrentPage(prevPage); // Update the currentPage directly
  
      // Calculate the remaining value for the "Load More" button
      const remainingValue = loadMoreValue + recipesToLoad;
      setLoadMoreValue(remainingValue);
  
      // Navigate back to the previous page
      router.push(`/${prevPage}`);
    }
  };
  

  return (
    <main>
      {pageNumber >= 2 && (
        <button onClick={goBack} disabled={false}>
          Go Back
        </button>
      )}
      <PreviewList recipes={documents} click={loadMoreRecipes} />
      {pageNumber >= 2 && (
        <button onClick={goBack} disabled={false}>
          Go Back
        </button>
      )}
      {loadMoreValue > 0 && (
        <button onClick={loadMoreRecipes} disabled={false}>
          Load More ({loadMoreValue} recipes remaining)
        </button>
      )}
      <button>Page: {pageNumber}</button>
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const { preview } = params;
  const pagesPath = parseInt(preview);
  const { documents, totalDataLength } = await run(pagesPath);

  return {
    props: {
      documents,
      pagesPath,
      totalDataLength,
    },
  };
}
