// component/Filter/ingredientsFilter.js
import React, { useEffect, useState } from "react";

const IngredientsFilter = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredientsData = async () => {
      const response = await fetch("/api/ingredients");
      const { ingredients } = await response.json();
      console.log(ingredients); // Log the fetched data
      setIngredients(ingredients);
    };

    fetchIngredientsData();
  }, []);

  return (
    <div>
      {ingredients.map((ingredient) => (
        <button key={ingredient._id}>{ingredient.name}</button>
      ))}
    </div>
  );
};

export default IngredientsFilter;
