import { createContext, useContext, useState } from "react"

const Context = createContext(null)

export default function StateContext(){
    return useContext(Context)

}

export function ContextProvider({children}){

    const [ pages, setPages ] = useState(0)

    return(
        <Context.Provider value={{pages, setPages}}>
            {children}
        </Context.Provider>
    )
}