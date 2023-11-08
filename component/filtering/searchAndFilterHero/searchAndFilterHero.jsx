import React from 'react';
import classes from './searchAndFilterHero.module.css';
const SearchAndFilterHero = ({ children }) => {
  return <div className={classes.background}>{children}</div>;
};

export default SearchAndFilterHero;
