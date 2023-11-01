import { useState } from "react";
import classes from './nutrition.module.css'
import {MdOutlineExpandLess,MdOutlineExpandMore} from 'react-icons/md'

export default function Nutritions({recipe}){

    const [showNutrition, setShowNutrition] = useState(false);

    return(
        <div className={classes.nutrition}>
            <h2>Nutrition:</h2>
            {showNutrition && (
                <div>
                    <ul>
                        {recipe.nutrition &&
                            Object.entries(recipe.nutrition).map(([key, value]) => (
                            <li key={key}>{`${key}: ${value}`}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button onClick={() => setShowNutrition(!showNutrition)} >
                {showNutrition ? <MdOutlineExpandLess fontSize={'20px'}/> : <MdOutlineExpandMore fontSize={'20px'}/>}
            </button>
        </div>
    )
}