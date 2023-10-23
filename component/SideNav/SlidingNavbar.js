import React, { useState } from 'react';

import { AiOutlineMenu,AiOutlineTags, AiOutlineHome, AiOutlineSetting, AiOutlineUser, AiOutlineHeart, } from 'react-icons/ai';
import classes from './sideNav.module.css';
import { MdOutlineFastfood,} from 'react-icons/md'
import StateContext from '@/useContext/StateContext';
import Link from 'next/link';

function Links(link, text){
  return (
    <Link href={link}>{text}</Link>
  )
}

const ExpandableMenu = () => {
  const {setToggleMenu, toggleMenu} = StateContext()

  const toggleExpand = () => {
    setToggleMenu(!toggleMenu);
  };

  const menuOptions = [
    { icon: Links('/',  <AiOutlineHome /> ) , name: Links('/', 'Home')},
    { icon: Links('/profile', <AiOutlineUser />) , name: Links('/profile', 'Profile') },
    { icon: Links(`/${50}`, <MdOutlineFastfood />) , name: Links(`${50}`, 'Recipes') },
    { icon: Links('/tags', <AiOutlineTags/>) , name: Links('/tags', 'Tags')},
    { icon: Links('/',  <AiOutlineHeart />), name: Links('/', 'Favourites') },
    { icon: Links('/', <AiOutlineSetting />) , name: Links('/', 'Settings')  },
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
                  <p className={classes.optionName}>{option.name}</p>
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
