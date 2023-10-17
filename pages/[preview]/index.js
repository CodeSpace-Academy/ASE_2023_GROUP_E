import PreviewList from '@/component/Recipes/Preview/PreviewList';
import { run } from '@/database';
import { useRouter } from 'next/router';
import { useState } from 'react';


export default function AllRecipes({ documents, pagesPath, totalDataLength }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(pagesPath);
  const recipesToLoad = 100;
  console.log(documents)

  // Calculate the initial value for Load More
  const initialLoadMoreValue = totalDataLength - currentPage;
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
      {/* <Recipes
        recipes={results && results}
        click={loadMoreRecipes}
      /> */}

      <PreviewList 
        recipes={documents && documents}
        click={loadMoreRecipes}
      />
    <button onClick={loadMoreRecipes}>Load More {initialLoadMoreValue}</button>
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const { preview } = params;
  const pagesPath = parseInt(preview);
  const {documents, totalDataLength} = await run(pagesPath);

  return {
    props: {
      documents,
      pagesPath,
      totalDataLength,
    },
  };
}