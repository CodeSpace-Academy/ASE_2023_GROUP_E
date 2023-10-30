import { useState } from 'react';
import classes from './ingredients.module.css'

export default function Ingredients({recipe}){

  const [showIngredients, setShowIngredients] = useState(false);

    return(
        <div className={classes.ingredients}>
            <h2>Ingredients:</h2>
            {showIngredients && (
                <div>
                    <ul>
                        {recipe.ingredients &&
                            Object.entries(recipe.ingredients).map(
                                ([ingredient, amount]) => (
                                <li key={ingredient}>{`${ingredient}: ${amount}`}</li>
                                )
                            )}
                    </ul>
                </div>
            )}
            <button onClick={() => setShowIngredients(!showIngredients)} >
                {showIngredients ? 'Hide Ingredients' : 'Show Ingredients'}
            </button>
        </div>
    )
}