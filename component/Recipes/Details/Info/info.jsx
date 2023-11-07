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

export default function Info({ recipe, allergens }) {
  const { edit, setEdit } = StateContext();

  /**
   * Contains the allergens present in this recipe
   */
  const allergenList = [];

  // If ingredient is present in allergen array, add it to the allergens list
  for (const ingredient in recipe.ingredients) {
    if (allergens?.includes(ingredient)) {
      allergenList.push(ingredient);
    }
  }

  return (
    <div className={classes.info}>
      <div className={classes.info1}>
        <h2>{recipe.title}</h2>
        <div>
          <strong>Description:</strong>
          { recipe.description
            ? <p>{recipe.description}</p> : <ErrorMessage message="Failed to load description." />}
        </div>

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

        <div>
          <strong>Category:</strong>
          {recipe.category}
        </div>

        <div className={classes.tagsDesktop}>
          <SingleRecipeTags tags={recipe.tags} />
        </div>

        <div>
          <strong>Allergens:</strong>
          {allergenList.length !== 0 ? (
            <SingleRecipeAllergens allergensList={allergenList} />
          ) : (
            <div>
              <p>No allergens</p>
            </div>
          )}
        </div>
      </div>
      <FavouritesButton recipe={recipe} />
    </div>
  );
}
