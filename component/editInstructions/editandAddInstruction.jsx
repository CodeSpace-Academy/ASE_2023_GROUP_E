import StateContext from '../../useContext/StateContext';
import Button, { WhiteButton } from '../Button/button';
import EditInstruction, {
  GetSpecificInstruction,
  NewInstruction,
} from './editInstructions';
import classes from './editandAdd.module.css';
import ErrorMessage from '../Error/ErrorMessage';
import IndividualRecipeIntruction from '../singleRecipe/instructions/individualRecipeIntruction';

/**
 * Component for editing and adding instructions to a recipe.
 * @component
 * @param {object} recipe - The recipe object containing instructions.
 * @returns {JSX.Element} JSX element representing the EditandAddInstruction component.
 */

export function EditandAddInstruction({ recipe }) {
  // eslint-disable-next-line object-curly-newline
  const {
    editInstruction,
    addInstruction,
    setAddInstruction,
    instructionIndex,
  } = StateContext();

  return (
    <div className={classes.modifyInstruction}>
      <div className={classes.editInstruction}>
        {editInstruction ? (
          ''
        ) : (
          <GetSpecificInstruction instructions={recipe.instructions} />
        )}
        {editInstruction && (
          <EditInstruction info={recipe.instructions[instructionIndex]} />
        )}
      </div>
      {addInstruction ? (
        <NewInstruction />
      ) : (
        <div className={classes.addButton}>
          <WhiteButton
            text="Add Instruction"
            click={() => setAddInstruction(!addInstruction)}
          />
        </div>
      )}
    </div>
  );
}
/**
 * Component for displaying recipe instructions.
 * @component
 * @param {object} recipe - The recipe object containing instructions.
 * @returns {JSX.Element} JSX element representing the Instructions component.
 */
export default function Instructions({ recipe }) {
  return (
    <div className={classes.instructions}>
      <h2>Instructions:</h2>
      {recipe.instructions ? ( // disable to demo instructions
        <div className={classes.instructionContainer}>

          <ol>
            {recipe.instructions &&
              recipe.instructions.map((instruction, index) => (
                // eslint-disable-next-line react/no-array-index-key
               <li key={index}> 
                 <IndividualRecipeIntruction
                    number={index}
                    instruction={instruction}
                  />
                </li>

              ))}
          </ol>
          <div>
          <h5>Edit or add a new instruction</h5>
          
          <EditandAddInstruction recipe={recipe}/ >
          
          
          </div>
        </div>
      ) : (
        <ErrorMessage message="Failed to load instructions." />
      )}
    </div>
  );
}
