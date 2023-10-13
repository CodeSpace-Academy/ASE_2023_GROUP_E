import React from 'react';
import Tag from './Tag';
import classes from './TagsContainer.module.css';

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
