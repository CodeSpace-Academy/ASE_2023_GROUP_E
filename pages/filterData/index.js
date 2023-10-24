// pages/filterData/index

import React from "react";
import IngredientsFilter from "@/component/Filter/ingredientsFilter";

const  filterData= () => {
  return (
    <div>
      <h1>Filter by Ingredients</h1>
      <IngredientsFilter />
      
    </div>
  );

};

export default filterData;