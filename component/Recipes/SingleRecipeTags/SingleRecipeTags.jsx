import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import classes from './SingleRecipeTags.module.css';
import SingleRecipeTag from './SingleRecipeTag';
/**
 * Takes in an array of tag strings and displays each tag string
 * in a SingleRecipeTag component
 * @param {array} tags
 * @returns
 */
export default function SingleRecipeTags({ tags }) {
  return (
    <div className={classes.tagsContainer}>
      <ul className={classes.tagsList}>
        {tags.map((tag) => {
          return <SingleRecipeTag key={uuidv4()} tag={tag} />;
        })}
      </ul>
    </div>
  );
}
