const { createContext, useContext, useState } = require("react");


const Context = createContext()

export default function StateContext(){
    return useContext(Context)
}

export function ContextProvider({children}){
    
    const [ toggleMenu , setToggleMenu ] = useState(false) 
    const [ edit, setEdit] = useState(false)
    const [ editInstruction, setEditInstruction ] = useState(false)
    const [ instructionIndex, setInstructionIndex ] = useState(null)

    return (
        <Context.Provider value={{instructionIndex, setInstructionIndex, editInstruction, setEditInstruction, edit, setEdit, toggleMenu, setToggleMenu}}>
            {children}
        </Context.Provider>
    )
}