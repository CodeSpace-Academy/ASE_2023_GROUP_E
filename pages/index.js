
import React, { useEffect, useState } from 'react';
import Recipes from '@/component/Recipes/all-recipes';
import { run } from '@/database';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home({ results }) {
const [uniqueTags, setUniqueTags] = useState([]);

const router = useRouter()

useEffect(() => {
if (results) {
       const allTags = results.reduce((tags, recipe) => {
         return tags.concat(recipe.tags);
       }, []);

       const uniqueTags = [...new Set(allTags)]; // Remove duplicates
       console.log('uniqueTags:', uniqueTags); // Debugging
       setUniqueTags(uniqueTags);
     }
   }, [results]);

   return (
     <main>
<Recipes recipes={uniqueTags} />
       {/* <div>
         {uniqueTags.map((tag) => (
           <div key={tag}>
             <h3>{tag}</h3>
           </div>
         ))}
       </div> */}

       <Link href={'/tags'}>TagsList</Link>
       <button  onClick={() => router.push(`/${100}`)}>All Recipes</button>
     </main>
   );
 }

export async function getStaticProps() {
   const results = await run();

   return {
     props: {
       results,
     },
   };
 }

