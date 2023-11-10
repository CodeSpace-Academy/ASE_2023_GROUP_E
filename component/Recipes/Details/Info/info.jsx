/* eslint-disable import/no-useless-path-segments */
import { TiEdit } from 'react-icons/ti';
import EditDescription from '../../../../component/editDecription/editDescription';
import classes from './info.module.css';
import Button from '../../../../component/Button/button';
import SingleRecipeTags from '../../SingleRecipeTags/SingleRecipeTags';
import SingleRecipeAllergens from '../../Allergens/SingleRecipeAllergens';
import FavouritesButton from '../../../../component/Favourites/FavouritesButton/FavouritesButton';
import StateContext from '../../../../useContext/StateContext';
import ErrorMessage from '../../../../component/Error/ErrorMessage';
import { PrepandCookTime } from '@/component/handlerTime/timeRead';

export default function Info({ recipe, allergens }) {
  const { edit, setEdit } = StateContext();

  /**
   * Contains the allergens present in this recipe
   */
  const allergenList = [];

  // If ingredient is present in allergen array, add it to the allergens list

  for (let ingredient in recipe.ingredients) {
    for (let allergen in allergens) {
      if (ingredient.toLowerCase()?.includes(allergens[allergen])) {
        allergenList.push(ingredient);
      }

    }
  }

  return (
    <div className={classes.info}>
      <div className={classes.info1}>
        <p className={classes.category}>{recipe.category}</p>
        <h2 className={classes.title}>{recipe.title}</h2>
        <div>
          {/* <strong>Tags:</strong> */}
          <SingleRecipeTags tags={recipe.tags} />
        </div>
        <div className={classes.times}>
          <PrepandCookTime recipe={recipe} />
        </div>
        <div className={classes.allergensContainer}>
          <strong>Allergens:</strong>
          {allergenList.length !== 0 ? (
            <SingleRecipeAllergens allergensList={allergenList} />
          ) : (
            <>
              <p>No allergens</p>
            </>
          )}
        </div>
        <FavouritesButton recipe={recipe} />
        <div className={classes.description}>{ recipe.description
            ? <p>{recipe.description}</p> : <ErrorMessage message="Failed to load description." />}</div>

        {/**
         * {@link info} is a props that hold the current descripton that will get modified
         */}
        {edit ? (
          <EditDescription info={recipe.description} />
        ) : (
          <Button
            color="blue"
            text={<TiEdit fontSize="25px" />}
            click={() => { setEdit(!edit); }}
          />
        )}

        {/* <div>
          <strong>Category:</strong> {recipe.category}
        </div> */}
      </div>
    </div>
  );
}
