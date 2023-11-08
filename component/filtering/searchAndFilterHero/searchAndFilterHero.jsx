import React from 'react';
import classes from './searchAndFilterHero.module.css';
const SearchAndFilterHero = ({ children }) => {
  return (
    <div className={classes.background}>
      <div className={classes.inputsContainer}>
        <h2 className={classes.heading}>Customize your recipe</h2>
        {children}
      </div>
    </div>
  );
};

export default SearchAndFilterHero;
