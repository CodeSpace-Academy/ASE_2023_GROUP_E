/* eslint-disable import/no-useless-path-segments */
import { useState } from 'react';
import { TiEdit } from 'react-icons/ti';
import classes from './info.module.css';
import EditDescription from '../../../../component/editDecription/editDescription';
import Button from '../../../../component/Button/button';
import SingleRecipeAllergens from '../../Allergens/SingleRecipeAllergens';
import FavouritesButton from '../../../../component/Favourites/FavouritesButton/FavouritesButton';
import StateContext from '../../../../useContext/StateContext';
import ErrorMessage from '../../../../component/Error/ErrorMessage';
import { PrepandCookTime } from '../../../handlerTime/timeRead';

export default function Info({ recipe, allergens }) {
  const { edit, setEdit } = StateContext();
  const [loadmore, setLoadmore] = useState(false);

  /**
   * Contains the allergens present in this recipe
   */
  const allergenList = [];

  // If ingredient is present in allergen array, add it to the allergens list
  // Put ingredient object keys (ingredient text) into array and loop over them
  // loop over allegens and check if the ingredient includes
  // the allergen
  Object.values(recipe.ingredients).forEach((ingredient) => {
    allergens.forEach((allergen) => {
      if (ingredient.toLowerCase()?.includes(allergen)) {
        allergenList.push(ingredient);
      }
    });
  });
  return (
    <div className={classes.info}>
      <div className={classes.info1}>
        <p className={classes.category}>{recipe.category}</p>

        <div className={classes.times}>
          <PrepandCookTime recipe={recipe} />
        </div>

        <div className={classes.allergensContainer}>
          <strong>Allergens:</strong>
          {allergenList.length !== 0 ? (
            <SingleRecipeAllergens allergensList={allergenList} />
          ) : (
            <div>
              <p>No allergens</p>
            </div>
          )}
        </div>

        <FavouritesButton recipe={recipe} />

        <div className={classes.description}>
          {recipe.description ? (
            <p>
              {loadmore
                ? recipe.description
                : recipe.description.substring(0, 180)}
              <button
                type="button"
                className={classes.loadmore}
                onClick={() => {
                  return setLoadmore(!loadmore);
                }}
              >
                {loadmore ? 'Load less' : 'Load more'}
              </button>
            </p>
          ) : (
            <ErrorMessage message="Failed to load description." />
          )}
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
            click={() => {
              setEdit(!edit);
            }}
          />
        )}
      </div>
    </div>
  );
}
