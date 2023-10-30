import { useState } from "react";
import classes from './nutrition.module.css'

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
                {showNutrition ? 'Hide Nutrition' : 'Show Nutrition'}
            </button>
        </div>
    )
}