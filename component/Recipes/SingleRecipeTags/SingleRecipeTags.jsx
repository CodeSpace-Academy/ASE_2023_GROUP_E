// Display the array of single recipe tags present in each recipe
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import classes from './SingleRecipeTags.module.css';
import SingleRecipeTag from './SingleRecipeTag';

/**
 *  Display the array of single recipe tag strings present in each recipe.
 *  The user can see all the tags associated with a single recipes.
 * @param {object} props
 * @param {string[]} props.tags - An array of tag strings.
 * @returns {JSX.Element} - ul list containing the SingleRecipeTags (li)
 */
export default function SingleRecipeTags({ tags }) {
  return (
    <ul className={classes.tagsList}>
      {tags.map((tag) => {
        return <SingleRecipeTag key={uuidv4()} tag={tag} />;
      })}
    </ul>
  );
}
