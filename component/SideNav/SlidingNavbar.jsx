import React from 'react';
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
} from 'react-icons/ai';
import { MdOutlineFastfood } from 'react-icons/md';
import classes from './sideNav.module.css';
import StateContext from '@/useContext/StateContext';
import Link from 'next/link';
import { IoMdClose } from 'react-icons/io';

const ExpandableMenu = () => {
  const { setToggleMenu, toggleMenu } = StateContext();

  const menuOptions = [
    { link: '/', text: 'Nav bar expanded/closed', icon: toggleMenu ? <IoMdClose /> : <AiOutlineMenu /> },
    { link: '/', text: 'Home', icon: <AiOutlineHome /> },
    { link: '/recipes', text: 'All Recipes', icon: <MdOutlineFastfood /> },
    { link: '/favourites', text: 'Favourites', icon: <AiOutlineUser /> },
    { link: '/', text: 'User', icon: <AiOutlineUser /> },
    { link: '/', text: 'Settings', icon: <AiOutlineSetting /> },
  ];

  // Filtering menuOptions based on the specified icons and their order
  const filteredMenuOptions = menuOptions.filter(
    option =>
      option.text === 'Nav bar expanded/closed' ||
      option.text === 'Home' ||
      option.text === 'All Recipes' ||
      option.text === 'Favourites' ||
      option.text === 'User' ||
      option.text === 'Settings'
  );

  return (
    <div className={classes.pageContainer}>
      <div className={classes.expandableMenu}>
        {/* Render the toggle button */}
        {filteredMenuOptions[0].icon}

        <ul className={`${classes.menuOptions} ${toggleMenu ? classes.expanded : ''}`}>
          {filteredMenuOptions.slice(1).map((option, index) => (
            <li key={index} onClick={() => setToggleMenu(false)}>
              <div className={classes.link}>{option.icon}</div>
              <Link href={option.link}>
                <p className={classes.optionName}>{option.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpandableMenu;
