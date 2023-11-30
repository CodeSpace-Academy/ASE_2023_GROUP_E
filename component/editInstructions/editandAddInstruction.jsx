import StateContext from '../../useContext/StateContext';
import { WhiteButton } from '../Button/button';
import EditInstruction, {
  GetSpecificInstruction,
  NewInstruction,
} from './editInstructions';
import classes from './editandAdd.module.css';
import ErrorMessage from '../Error/ErrorMessage';
import IndividualRecipeIntruction from '../singleRecipe/instructions/individualRecipeIntruction';

/**
 * Component for editing and adding instructions to a recipe.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.recipe - The recipe object containing instructions.
 * @returns {JSX.Element} - The EditandAddInstruction component.
 */
export function EditandAddInstruction({ recipe }) {
  // Destructure values from the global state using the StateContext.
  const {
    editInstruction,
    addInstruction,
    setAddInstruction,
    instructionIndex,
  } = StateContext();

  return (
    <div className={classes.modifyInstruction}>
      <div className={classes.editInstruction}>
        {/* Conditionally render specific instruction or edit instruction 
        component based on editInstruction state. */}
        {editInstruction ? (
          ''
        ) : (
          <GetSpecificInstruction instructions={recipe.instructions} />
        )}
        {editInstruction && (
          <EditInstruction info={recipe.instructions[instructionIndex]} />
        )}
      </div>
      {/* Conditionally render NewInstruction component or Add Instruction 
      button based on addInstruction state. */}
      {addInstruction ? (
        <NewInstruction />
      ) : (
        <div className={classes.addButton}>
          <WhiteButton
            text="Add Instruction"
            // Toggle the addInstruction state when the button is clicked.
            click={() => { return setAddInstruction(!addInstruction); }}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Component for displaying instructions of a recipe.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.recipe - The recipe object containing instructions.
 * @returns {JSX.Element} - The Instructions component.
 */
export default function Instructions({ recipe }) {
  return (
    <div className={classes.instructions}>
      <h2>Instructions:</h2>
      {recipe.instructions ? ( // Check if instructions are available (disabled for demo).
        <div className={classes.instructionContainer}>
          <ol>
            {/* Map through recipe instructions and render IndividualRecipeIntruction
             component for each. */}
            {recipe.instructions
              && recipe.instructions.map((instruction, index) => {
                return (
                  <li key={index}>
                    <IndividualRecipeIntruction
                      number={index}
                      instruction={instruction}
                    />
                  </li>
                );
              })}
          </ol>
          <div>
            <h5>Edit or add a new instruction</h5>
            {/* Render the EditandAddInstruction component for editing or adding instructions. */}
            <EditandAddInstruction recipe={recipe} />

          </div>
        </div>
      ) : (
        // Render an error message if instructions failed to load.
        <ErrorMessage message="Failed to load instructions." />
      )}
    </div>
  );
}
