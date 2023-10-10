import StateContext from "./Context";


export function PageNum(){

    const { pages } = StateContext()

    return pages
}

export const num = PageNum()