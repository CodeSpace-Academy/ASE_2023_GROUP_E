
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {

  
  return (
    <main>
      <Link href={'/tags'}>TagsList</Link>
    </main>
  );
}

