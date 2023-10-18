import React from 'react';
import classes from './SingleRecipeTag.module.css';
const SingleRecipeTag = ({ tag }) => {
  return (
    <li className={classes.tagItem}>
      <button className={classes.tagButton}>{tag}</button>
    </li>
  );
};

export default SingleRecipeTag;
