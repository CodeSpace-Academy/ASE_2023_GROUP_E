// Display a single recipe tag (as a list item (li))
//from an array of tags
import React from 'react';
import classes from './SingleRecipeTag.module.css';

/**
 * Displays an individual tag string from an array of single recipe tags.
 * @param {string} props.tag - The tag string to be displayed.
 * @returns {JSX.Element} List item (li) containing the tag string.
 */
export default function SingleRecipeTag({ tag }) {
  return (
    // List item containing tag string
    <li className={`${classes.tagItem} ${classes.tagButton}`}>{tag}</li>
  );
}
