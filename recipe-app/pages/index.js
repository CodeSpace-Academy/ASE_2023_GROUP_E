// import Recipes from '@/component/Home/recipes'
import { useEffect } from 'react'
import { Run } from '@/components/database/db'

export default function Home({ results }) {

  

  useEffect(() => {
    console.log(results)
    
   
  })

  return (
    <main>
      
      
    </main>
  )
}

export async function getStaticProps(){

  const results = await Run()


  return {
    props:{
      results,
      
    }
  }
}