import React from 'react';
import classes from './SingleRecipeTag.module.css';
/**
 * Display and indivual tag string
 * @param {string} tag
 * @returns
 */
const SingleRecipeTag = ({ tag }) => {
  return (
    <li className={classes.tagItem}>
      <button className={classes.tagButton}>{tag}</button>
    </li>
  );
};

export default SingleRecipeTag;
