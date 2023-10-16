import React from 'react';
import Tag from './Tag';
import classes from './TagsContainer.module.css';

//Please remove dummy tags data once tag list from the individual recipes
//can be fed into the TagsContainer component.
const tags = [
  'Dessert',
  'Low Protein',
  'Low Cholesterol',
  'Healthy',
  'Free Of...',
  'Summer',
  'Weeknight',
  'Freezer',
  'Easy',
];
/**
 * Expects tags list from a single recipe and displays tags for each individual recipe
 * @returns list of tags
 */
const TagsContainer = () => {
  //expecting {tags} as argument when
  return (
    <ul className={classes.container}>
      {tags.map((tagName, index) => {
        return <Tag key={index} tagName={tagName}></Tag>;
      })}
    </ul>
  );
};

export default TagsContainer;
