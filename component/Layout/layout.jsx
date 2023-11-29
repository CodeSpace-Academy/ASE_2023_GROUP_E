import React from 'react';
import Image from 'next/image';
import ExpandableMenu from '../SideNav/SlidingNavbar';
import classes from './layout.module.css';
import StateContext from '../../useContext/StateContext';
import { useRouter } from 'next/router';

/**
 * Layout component
 * @param {Object} children - The child components to be rendered within the layout.
 * @returns {JSX.Element} - Returns the layout structure including the ExpandableMenu, logo, and child components.
 */
function LayoutAll({ children }) {
  // Accessing toggleMenu from StateContext
  const { toggleMenu } = StateContext();
  const router = useRouter();

  return (
    <div>
      {/* Main layout container */}
      <div className={classes.layout}>
        {/* ExpandableMenu for mobile navigation */}
        <ExpandableMenu expanded={toggleMenu} />

        {/* Logo container with a link to the home page */}
        <div
          className={classes.imgDiv}
          onClick={() => router.push('/')}
        >
          <Image
            className={classes.img}
            src="/images/logo3.png"
            alt="Chefs Heaven Logo"
            width={270}
            height={100}
          />
        </div>

        {/* Container for the main content area, adjusted based on the menu state */}
        <div className={toggleMenu ? classes.expanded : classes.expand}>
          <div className={classes.children}>
            {/* Render child components within this section */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutAll;
