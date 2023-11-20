// Import React and necessary components/styles
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import classes from './SingleRecipeTags.module.css';
import SingleRecipeTag from './SingleRecipeTag';

/**
 * @function SingleRecipeTags
 * @description A component that takes in an array of tag strings and displays each tag string
 * in a SingleRecipeTag component.
 * @param {Object} props - The component's properties.
 * @param {Array} props.tags - An array of tag strings.
 * @returns {React.Component}  React component displaying recipe tags.
 */
export default function SingleRecipeTags({ tags }) {
  return (
    // Container for the tags component
    <div className={classes.tagsContainer}>
      {/* Unordered list to display the tags */}
      <ul className={classes.tagsList}>
        {/* Map through the tags array and display each tag using SingleRecipeTag component */}
        {tags.map((tag) => {
          // Assign a unique key using uuidv4 to each tag item
          return <SingleRecipeTag key={uuidv4()} tag={tag} />;
        })}
      </ul>
    </div>
  );
}
