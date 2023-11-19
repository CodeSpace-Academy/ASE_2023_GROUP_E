import HomeWithBackground from '@/component/home-page/HomeWithBackground';
import { getRecipes } from '@/database/getData/getRecipesData';
import { useEffect } from 'react';

export default function Home({removeId}) {

  useEffect(() => {
    console.log(removeId)
  })
  return (
    <main>
      <HomeWithBackground /> {/* Render the HomeWithBackground component. */}
    </main>
  );
}

export async function getServerSideProps(){

  const { removeId } = await getRecipes('searchHistory', 0, 5, {createdAt: 1}, [], [], '', 0 , null, '', '', 'bob' )
  return{
    props:{
      removeId
    }
  }
}
