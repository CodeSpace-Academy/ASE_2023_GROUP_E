
import React, { useEffect, useState } from 'react';
import Recipes from '@/component/Home/recipes';
import { run } from '@/database';
import Link from 'next/link';

export default function Home({ results }) {
const [uniqueTags, setUniqueTags] = useState([]);

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
       <Link href={'/tags'}>TagsList</Link>
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

