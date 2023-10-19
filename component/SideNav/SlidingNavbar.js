import React, { useState } from 'react';

import { AiOutlineMenu,AiOutlineTags, AiOutlineHome, AiOutlineSetting, AiOutlineUser, AiOutlineHeart, } from 'react-icons/ai';
import classes from './sideNav.module.css';
import { MdOutlineFastfood,} from 'react-icons/md'
import StateContext from '@/useContext/StateContext';
import Link from 'next/link';





const ExpandableMenu = () => {
  const {setToggleMenu, toggleMenu} = StateContext()

  const toggleExpand = () => {
    setToggleMenu(!toggleMenu);
  };

  const menuOptions = [
    { icon:<Link href={'/'} > <AiOutlineHome /></Link>, name: 'Home' },
    { icon: <Link href={'/'}><AiOutlineUser /> </Link>, name: 'Profile' },
    { icon: <Link href={`${50}`} ><MdOutlineFastfood /></Link>, name: 'Recipes' },
    { icon: <Link href={'/tags'}> <AiOutlineTags/> </Link>, name: 'Tags' },
    { icon: <AiOutlineHeart />, name: 'Favourites' },
    { icon: <AiOutlineSetting />, name: 'Settings' },
  ];

  return (
    <div className={classes.pageContainer}>
      <div className={classes.expandableMenu}>
        <div className={`${classes.menuToggle}`} onClick={toggleExpand}>
          <AiOutlineMenu />
        </div>

        <ul className={`${classes.menuOptions} ${toggleMenu ? classes.expanded : ''}`}>
          {menuOptions.map((option, index) => (
            <li key={index} onClick={() => setToggleMenu(false)}>
              {toggleMenu ? (
                <>
                  <div className={classes.link}>{option.icon}</div> {/* Increase the font size */}
                  {option.name}
                </>
              ) : (
                <div className={classes.links2}>
                  {option.icon}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={`${classes.content} ${toggleMenu ? '' : classes.contentClose}`}>
        {/* Add your page content here */}
        
        
      </div>


    </div>
  );
};

export default ExpandableMenu;
