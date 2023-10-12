

import Link from 'next/link';

export default function Home({ results }) {


   return (
     <main>
{/* 
       <Link href={'/tags'}>TagsList</Link> */}
       <button  onClick={() => router.push(`/${100}`)}>All Recipes</button>
     </main>
   );
 }

