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
