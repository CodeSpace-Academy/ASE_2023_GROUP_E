import React from 'react';
import Chip from '@mui/material/Chip';

const Tag = ({ tagName }) => {
  return (
    <li>
      <Chip label={tagName} />
    </li>
  );
};

export default Tag;
