import React from 'react';

const Tag = ({ tagName }) => {
  console.log(tagName);
  return <li>{tagName}</li>;
};

export default Tag;
