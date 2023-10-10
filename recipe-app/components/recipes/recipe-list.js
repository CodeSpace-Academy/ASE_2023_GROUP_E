import { DUMMY_RECIPES } from "@/Dummy-data";
import { useState, useEffect } from "react";

export default function RecipeList(recipe) {
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    // When currentRecipeIndex reaches the last recipe, hide the "Show More" button
    if (currentRecipeIndex >= recipe.length - 1) {
      setShowMore(false);
    }
  }, [currentRecipeIndex]);

  const handleShowMoreClick = () => {
    setCurrentRecipeIndex(currentRecipeIndex + 1);
  };

  return (
    <div>
      {recipe.slice(0, currentRecipeIndex + 1).map((recipe, index) => (
        <div key={index}>
          <h3>{recipe.title}</h3>
        </div>
      ))}
      {showMore && (
        <button onClick={handleShowMoreClick}>
          {currentRecipeIndex < recipe.length - 1
            ? `Show More ${recipe.length - currentRecipeIndex - 1}`
            : "No More Recipes"}
        </button>
      )}
    </div>
  );
}
