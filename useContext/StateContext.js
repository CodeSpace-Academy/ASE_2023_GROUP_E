const { createContext, useContext, useState } = require("react");


const Context = createContext()

export default function StateContext(){
    return useContext(Context)
}

export function ContextProvider({children}){
    
    const [ toggleMenu , setToggleMenu ] = useState(false) 

    return (
        <Context.Provider value={{ toggleMenu, setToggleMenu}}>
            {children}
        </Context.Provider>
    )
}