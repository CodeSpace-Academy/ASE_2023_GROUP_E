import React, { useState } from 'react';
import Recipes from '@/component/Recipes/all-recipes';
import { run } from '@/database';
import { useRouter } from 'next/router';

export default function AllRecipes({ results, pagesPath }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(pagesPath);
  const recipesToLoad = 100;

  // Calculate the initial value for Load More
  const initialLoadMoreValue = 164959 - currentPage;
  const [loadMoreValue, setLoadMoreValue] = useState(initialLoadMoreValue);

  const loadMoreRecipes = () => {
    // Calculate the number of recipes to load for the next page
    const nextPage = currentPage + recipesToLoad;
    setCurrentPage(nextPage);

    // Calculate the new value based on the updated currentPage and recipesToLoad
    const newLoadMoreValue = initialLoadMoreValue - recipesToLoad;
    setLoadMoreValue(newLoadMoreValue);

    // Navigate to the next page with the appropriate number of recipes to load
    router.push(`/${nextPage}`);
  };

  return (
    <main>
      <Recipes recipes={results && results} />
      <button onClick={loadMoreRecipes}>Load More {loadMoreValue}</button>
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const pagesPath = parseInt(slug[0]);
  const results = await run(pagesPath);

  return {
    props: {
      results,
      pagesPath,
    },
  };
}
