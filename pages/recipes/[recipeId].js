import React from 'react';
import { run } from '@/database';
import TagsContainer from '@/component/recipe-tags/TagsContainer';

const singleRecipePage = ({ singleRecipe, allRecipes }) => {
  const {
    category,
    cook,
    description,
    images,
    ingredients,
    instructions,
    nutrition,
    prep,
    published,
    servings,
    tags,
    title,
    _id: id,
  } = singleRecipe;

  return <div>{title} </div>;
};
export default singleRecipePage;

export const getStaticProps = async ({ params }) => {
  const allRecipes = await run();
  const recipeId = params.recipeId;
  const singleRecipe = allRecipes.find((recipe) => {
    return recipe._id === recipeId;
  });

  // return { props: { allRecipes } };
  return { props: { singleRecipe } };
};
export const getStaticPaths = async () => {
  const allRecipes = await run();
  const allPaths = allRecipes.map((recipe) => {
    const id = recipe._id;
    return { params: { recipeId: `${id}` } };
  });
  return {
    paths: allPaths,

    fallback: false, // to create text for if it's a path not included
  };
};
