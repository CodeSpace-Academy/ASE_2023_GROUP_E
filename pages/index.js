

import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home({ results }) {

const router = useRouter()
   return (
     <main>
{/* 
       <Link href={'/tags'}>TagsList</Link> */}
       <button  onClick={() => router.push(`/${100}`)}>All Recipes</button>
     </main>
   );
 }

