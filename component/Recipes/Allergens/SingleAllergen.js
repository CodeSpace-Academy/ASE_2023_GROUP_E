import React from 'react';
import classes from './SingleAllergen.module.css';
const SingleAllergen = ({ allergen }) => {
  return <li className={classes.listItem}>{allergen}</li>;
};

export default SingleAllergen;
