import Recipes from '@/component/Home/recipes';
import { useEffect } from 'react';
import TagsContainer from '@/component/recipe-tags/TagsContainer';
export default function Home() {
  return (
    <main>
      <Recipes />
      <TagsContainer />
    </main>
  );
}
