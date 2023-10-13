import React from 'react';
import Chip from '@mui/material/Chip';
import classes from './tag.module.css';

/**
 * Expects tagName from the the tagsContainer component
 * @param {string} tagName
 * @returns tag list item
 */
const Tag = ({ tagName }) => {
  return (
    <li className={classes.listItem}>
      <Chip label={tagName} />
    </li>
  );
};

export default Tag;
