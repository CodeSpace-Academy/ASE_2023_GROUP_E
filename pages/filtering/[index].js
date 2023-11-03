import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import PreviewList from "@/component/Recipes/Preview/PreviewList";
import getFilteredRecipes from "@/database/getFiltedRecipes";




export default function FilteredRecipes({ recipes }) {
  const router = useRouter();
  const { index } = router.query;


  return (
    <div>
      <h2>Filtered Recipes</h2>
      <PreviewList recipes={recipes} />
    </div>
  );
}


export async function getServerSideProps({ params, query }) {
  const skip = (params.index - 1) * 100; // Adjust this as needed
  const filter = {};


  if (query.categories) {
    filter.categories = query.categories;
  }


  if (query.tags) {
    filter.tags = query.tags;
  }


  if (query.ingredients) {
    filter.ingredients = query.ingredients;
  }


  if (query.numOfInstructions !== undefined && query.numOfInstructions >= 0) {
    filter.numOfInstructions = { $gte: parseInt(query.numOfInstructions) };
  }


  const recipes = await getFilteredRecipes(skip, filter);


  return {
    props: {
      recipes,
    },
  };
}
