const { createContext, useContext, useState } = require('react');

const Context = createContext();

export default function StateContext() {
  return useContext(Context);
}

export function ContextProvider({ children }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editInstruction, setEditInstruction] = useState(false);
  const [instructionIndex, setInstructionIndex] = useState(null);
  const [addInstruction, setAddInstruction] = useState(false);
  const [addSkip, setAddSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [total, setTotal] = useState(0)
  const [clearfilter, setClearFilter] = useState([])
  const [selectedIngredientsOptions, setSelectedIngredientsOptions] = useState([])
  const [selectedTagsOptions, setSelectedTagsOptions] = useState([]);
  const [selectedInstructionsOptions, setSelectedInstructionsOptions] = useState([]);
  const [selecteTags, setSelectedTags] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  //   Favourite recipes list global state
  let favouriteRecipesInLocalStorage;
  if (typeof window !== 'undefined') {
    favouriteRecipesInLocalStorage =
      JSON.parse(localStorage.getItem('favouriteRecipesList')) || [];
  }
  const [favouritesList, setFavouritesList] = useState(
    favouriteRecipesInLocalStorage || []
  );

  return (
    <Context.Provider
      value={{
        selectedCategory, 
        setSelectedCategory,
        selectedIngredients,
        setSelectedIngredients,
        selecteTags,
        setSelectedTags,
        selectedTagsOptions,
        setSelectedTagsOptions,
        selectedIngredientsOptions,
        setSelectedIngredientsOptions,
        selectedInstructionsOptions,
        setSelectedInstructionsOptions,
        clearfilter,
        total, 
        setTotal,
        filteredResults,
        setFilteredResults,
        addSkip,
        setAddSkip,
        addInstruction,
        setAddInstruction,
        instructionIndex,
        setInstructionIndex,
        editInstruction,
        setEditInstruction,
        edit,
        setEdit,
        toggleMenu,
        setToggleMenu,
        favouritesList,
        setFavouritesList,
      }}
    >
      {children}
    </Context.Provider>
  );
}
