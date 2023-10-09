import { DUMMY_RECIPES } from "@/Dummy-data"

export default function RecipeList (props) {
 
   const  {title , description,  published  } = props
    
    return (
        <>
        <h1> {title} </h1>
        <h3>{description}</h3>
        <h3>{published}</h3>
        
        </>

    )

    }