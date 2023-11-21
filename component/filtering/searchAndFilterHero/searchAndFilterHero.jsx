import React, { useState } from 'react';
import classes from './searchAndFilterHero.module.css';
import { WhiteButton } from '@/component/Button/button';

const SearchAndFilterHero = ({ children }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  const closeOverlay = () => {
    setIsOverlayVisible(false);
  };

  return (
    <div>
      <WhiteButton click={toggleOverlay} text={isOverlayVisible ? "hide filter" : 'Filters'} />
      {isOverlayVisible && (
        <div className={classes.overlay}>
         
          <div className={classes.background}>
          <h1 style={{color:'white'}}> Filters</h1>
            <div className={classes.inputsContainer}>
              <button className={classes.closeButton} onClick={closeOverlay}>
                Close
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilterHero;
