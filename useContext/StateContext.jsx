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
  const [selectedInstructionsOptions, setSelectedInstructionsOptions] = useState(0);
  const [selecteTags, setSelectedTags] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({value: ''});
  const [andOr, setAndOr] = useState(false);
  const [searchInput, setSearchInput] = useState(null);
  const [searchText, setSearchText] = useState('');

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
        searchText, 
        setSearchText,
        searchInput,
        setSearchInput,
        andOr, 
        setAndOr,
        selectedCategory, 
        setSelectedCategory,
        selectedIngredients,
        setSelectedIngredients,
        selecteTags,
        setSelectedTags,
        selectedInstructionsOptions,
        setSelectedInstructionsOptions,
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
