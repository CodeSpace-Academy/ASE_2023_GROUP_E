// Import React and necessary styles
import React from 'react';
import classes from './SingleRecipeTag.module.css';

/**
 * @function SingleRecipeTag
 * @description Displays an individual tag string from a list of recipe tags .
 * @param {string} props.tag - The tag string to be displayed.
 * @returns {React.Component} List item containing a span with the tag string.
 */
export default function SingleRecipeTag({ tag }) {
  return (
    // List item containing a clickable button with the tag string
    <li className={`${classes.tagItem} ${classes.tagButton}`}>{tag}</li>
  );
}
