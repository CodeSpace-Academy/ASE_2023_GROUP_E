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
