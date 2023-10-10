import React from 'react';
import Tag from './Tag';

const tags = [
  [
    'Dessert',
    'Low Protein',
    'Low Cholesterol',
    'Healthy',
    'Free Of...',
    'Summer',
    'Weeknight',
    'Freezer',
    'Easy',
  ],
];

const TagsContainer = () => {
  //expecting {tags} as argument
  return (
    <ul>
      {tags.map((tagName, index) => {
        return <Tag key={index} tagName={tagName}></Tag>;
      })}
    </ul>
  );
};

export default TagsContainer;
