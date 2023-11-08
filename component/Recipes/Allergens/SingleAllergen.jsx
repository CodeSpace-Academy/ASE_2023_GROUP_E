import React from 'react';
import classes from './SingleAllergen.module.css';
/**
 * Takes in and displays an allergen string
 * @param {string} allergen
 * @returns
 */
const SingleAllergen = ({ allergen }) => {
  return <li className={classes.listItem}>{allergen}</li>;
};

export default SingleAllergen;
