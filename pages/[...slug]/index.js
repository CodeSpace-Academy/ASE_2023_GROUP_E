import Recipes from '@/component/Recipes/all-recipes';

import { useRouter } from 'next/router';
import { useState } from 'react';

export default function AllRecipes({ results, pagesPath }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(pagesPath);
  const [recipesToLoad, setRecipesToLoad] = useState(100);

  const loadMoreRecipes = () => {
    // Increases the currentPage by 1
    setCurrentPage(currentPage + 1);

    // Increase the number of recipes to load by 100
    setRecipesToLoad(recipesToLoad + 100);

    // Navigate to the next page
    router.push(`/${currentPage + 100}`);
  };

  return (
    <main>
      <Recipes
        recipes={results && results}
        click={loadMoreRecipes}
      />
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
