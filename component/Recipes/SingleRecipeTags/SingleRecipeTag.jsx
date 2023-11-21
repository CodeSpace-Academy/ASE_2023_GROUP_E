// Import React and necessary styles
import React from 'react';
import classes from './SingleRecipeTag.module.css';

/**
 * @function SingleRecipeTag
 * @description Displays an individual tag string as a clickable button.
 * @param {Object} props - The component's properties.
 * @param {string} props.tag - The tag string to be displayed.
 * @returns {React.Component} React component displaying an individual recipe tag.
 */
export default function SingleRecipeTag({ tag }) {
  return (
    // List item containing a clickable button with the tag string
    <li className={classes.tagItem}>
      <span className={classes.tagButton}>{tag}</span>
    </li>
  );
}
