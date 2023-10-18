import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home({ results }) {
  const router = useRouter();
  console.log(router);
  return (
    <main>
      <Link href={'/tags'}>TagsList</Link>

      <button onClick={() => router.push(`/${50}`)}>All Recipes</button>
      {/* <button onClick={() => router.push(`/${'recipes'}`)}>All Recipes</button> */}
    </main>
  );
}
