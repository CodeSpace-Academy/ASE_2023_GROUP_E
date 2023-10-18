import React from 'react';
import { useRouter } from 'next/router';
import HomeWithBackground from '../component/home-page/HomeWithBackground';
export default function Home({ results }) {

  const router = useRouter() // Initialize the router for navigation.

   return (
     <main>
      <HomeWithBackground/> {/* Render the HomeWithBackground component. */}
     </main>
   );
 }

