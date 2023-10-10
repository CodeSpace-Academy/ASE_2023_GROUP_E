import Recipes from '@/component/Home/recipes'
import { useEffect, useState } from 'react'
import { run } from '@/database'

export default function Home({ results }) {


  useEffect(() => {
    console.log(results[0])
  })
  return (
    <main>
      <Recipes 
        recipes = {results  && results}
      />
    </main>
  )
}

export async function getStaticProps(){

  const results = await run()

  return {
    props:{
      results
    }
  }
}