import HomeWithBackground from '@/component/home-page/HomeWithBackground';
import { getRecipes } from '@/database/getData/getRecipesData';
import { useEffect } from 'react';

export default function Home({recipes}) {

  useEffect(() => {
    console.log(recipes)
  })
  return (
    <main>
      <HomeWithBackground /> {/* Render the HomeWithBackground component. */}
    </main>
  );
}

export async function getServerSideProps(){

  const { recipes } = await getRecipes('recipes', 0, 5, {createdAt: 1}, [], [], '', 0 , null, '', 'tags' )
  return{
    props:{
      recipes
    }
  }
}
