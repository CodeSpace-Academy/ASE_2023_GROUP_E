import React, { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import classes from './searchAndFilterHero.module.css';
import { WhiteButton } from '../../Button/button';

function SearchAndFilterHero({ children }) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  const closeOverlay = () => {
    setIsOverlayVisible(false);
  };

  return (
    <div>
      <WhiteButton click={toggleOverlay} text={isOverlayVisible ? 'hide filter' : 'Filters'} />
      {isOverlayVisible && (
        <div className={classes.overlay}>

          <div className={classes.background}>
            <h1 style={{ color: 'white' }}> Filters</h1>
            <div className={classes.inputsContainer}>
              <div className={classes.closeButton} onClick={closeOverlay}>
                <IoIosCloseCircle size={33} color="white" />
              </div>
              {children}
              <div className={classes.applyFiltersButton}>
              <WhiteButton text="Apply Filters" click={closeOverlay} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchAndFilterHero;
