import React from 'react';
import classes from './SingleRecipeTag.module.css';
/**
 * Display and indivual tag string
 * @param {string} tag
 * @returns
 */
export default function SingleRecipeTag({ tag }) {
  return (
    <li className={classes.tagItem}>
      <button className={classes.tagButton} type="button">
        {tag}
      </button>
    </li>
  );
}
