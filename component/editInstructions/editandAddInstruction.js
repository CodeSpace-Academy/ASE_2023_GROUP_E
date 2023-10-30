import StateContext from "@/useContext/StateContext";
import Button from "../Button/button";
import EditInstruction, { GetSpecificInstruction, NewInstruction } from "./editInstructions";
import classes from './editandAdd.module.css'
import ErrorMessage from "../Error/ErrorMessage";
import IndividualRecipeIntruction from "../singleRecipe/instructions/individualRecipeIntruction";


export function EditandAddInstruction({recipe}){

    const { editInstruction, addInstruction, setAddInstruction, instructionIndex, } = StateContext()

    return(
        
        <div className={classes.modifyInstruction}>
            <div className={classes.editInstruction}>
            {editInstruction ? (
                ''
            ) : (
                <GetSpecificInstruction instructions={recipe.instructions} />
            )}
            {editInstruction && (
                <EditInstruction
                    info={recipe.instructions[instructionIndex]}
                />
            )}
            </div>
                {addInstruction ? (
                    <NewInstruction />
                    ) : (
                <div className={classes.addButton}>
                    <Button
                    text="Add Instruction"
                    color="success"
                    click={() => setAddInstruction(!addInstruction)}
                />
            </div>)}
        </div>
    )
}

export default function Instructions({recipe}){
    return (
        <div className={classes.instructions}>
        <h2>Instructions :</h2>
        {recipe.instructions ? (
          <div className={classes.instructionContainer}>
            <ol>
              {recipe.instructions &&
                recipe.instructions.map((instruction, index) => (
                  <li key={index}>
                    <IndividualRecipeIntruction
                      number={index}
                      instruction={instruction}
                    />
                  </li>
                ))}
            </ol>
            
            <EditandAddInstruction recipe={recipe }/>
          </div>
        ) : (
          <ErrorMessage message={'Error loading the instructions'} />
        )}
      </div>
    )
}

