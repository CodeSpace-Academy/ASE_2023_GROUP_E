
import React, { useEffect, useState } from 'react';
import { run } from '@/database';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home({ results }) {

   return (
     <main>
       <Link href={'/tags'}>TagsList</Link>

    
     </main>
   );
 }

