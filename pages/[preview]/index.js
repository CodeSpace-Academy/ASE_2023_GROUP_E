import PreviewList from '@/component/Recipes/Preview/PreviewList';
import { run } from '@/database';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function AllRecipes({ documents, pagesPath, totalDataLength }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(pagesPath);
  const recipesToLoad = 100;
  const [pageNumber, setPageNumber] = useState(1);
  const [loadMoreValue, setLoadMoreValue] = useState(totalDataLength - currentPage);
  const [loading, setLoading] = useState(false); // Initialize loading state

  const loadMoreRecipes = () => {
    // Prevent multiple clicks while loading
    if (loading) return;

    // Set loading state to true
    setLoading(true);

    // Calculate the number of recipes to load for the next page
    const nextPage = currentPage + recipesToLoad;
    setCurrentPage(nextPage);

    // Calculate the new value based on the updated currentPage and recipesToLoad
    const newLoadMoreValue = totalDataLength - nextPage;
    setLoadMoreValue(newLoadMoreValue);

    // Increment the page number
    setPageNumber(pageNumber + 1);

    // Navigate to the next page with the appropriate number of recipes to load
    router.push(`/${nextPage}`);
  };

  const goBack = () => {
    // Decrease the page number
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);

      // Increase the load more value when going back
      const prevPage = currentPage - recipesToLoad;
      setLoadMoreValue(totalDataLength - prevPage);

      // Set loading state to true
      setLoading(true);

      // Navigate back to the previous page
      router.push(`/${prevPage}`);
    }
  };

  // Add a useEffect to reset loading state
  useEffect(() => {
    setLoading(false);
  }, [currentPage]);

  return (
    <main>
      <PreviewList recipes={documents} click={loadMoreRecipes} />
      <button onClick={loadMoreRecipes} disabled={loading}>
        {loading ? 'Loading...' : `Load More ${loadMoreValue}`}
      </button>
      <button onClick={goBack} disabled={loading}>
        Go Back
      </button>
      <button>{pageNumber}</button>
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

