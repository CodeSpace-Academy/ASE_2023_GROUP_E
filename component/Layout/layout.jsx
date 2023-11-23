import React from 'react';
import Image from 'next/image';
import ExpandableMenu from '../SideNav/SlidingNavbar';
import classes from './layout.module.css';
import StateContext from '../../useContext/StateContext';
import { useRouter } from 'next/router';


/**
 * Layout component
 * @returns {JSX.Element} - returns the ExpandableMenu, the logo with the rendered child components.
 */


function LayoutAll({ children }) {
  // Accessing toggleMenu from StateContext
  const { toggleMenu } = StateContext();
  const router = useRouter()

  return (
    <div>
      <div className={classes.layout}>
        <ExpandableMenu expanded={toggleMenu} />

        <div className={classes.imgDiv} 
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

        <div className={toggleMenu ? classes.expanded : classes.expand}>
          <div className={classes.children}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutAll;
