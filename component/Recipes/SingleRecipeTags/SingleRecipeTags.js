import React from 'react';
import classes from './SingleRecipeTags.module.css';
import SingleRecipeTag from './SingleRecipeTag';
/**
 * Takes in an array of tag strings and displays each tag string
 * in a SingleRecipeTag component
 * @param {array} tags
 * @returns
 */
const SingleRecipeTags = ({ tags }) => {
  return (
    <div className={classes.tagsContainer}>
      <span>Tags: </span>
      <ul className={classes.tagsList}>
        {tags.map((tag, index) => {
          return <SingleRecipeTag key={index} tag={tag} />;
        })}
      </ul>
    </div>
  );
};

export default SingleRecipeTags;
