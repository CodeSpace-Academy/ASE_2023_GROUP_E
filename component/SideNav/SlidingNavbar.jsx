import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineHome, AiOutlineHeart, AiOutlineUser, AiOutlineSetting, AiOutlineClose } from 'react-icons/ai';
import classes from './sideNav.module.css';
import StateContext from '@/useContext/StateContext';
import Link from 'next/link';

const ExpandableMenu = () => {
  const { setToggleMenu, toggleMenu } = StateContext();
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const toggleExpand = () => {
    setToggleMenu(!toggleMenu);
    setIsNavBarOpen(!isNavBarOpen);
  };

  const menuOptions = [
    { icon: <AiOutlineMenu />, href: '/', text: 'Home' },
    { icon: <AiOutlineHome />, href: '/', text: 'All Recipes' },
    { icon: <AiOutlineHeart />, href: '/favourites', text: 'Favourites' },
    { icon: <AiOutlineUser />, href: '/profile', text: 'User' },
    { icon: <AiOutlineSetting />, href: '/', text: 'Settings' },
  ];

  return (
    <div className={classes.pageContainer}>
      <div className={classes.expandableMenu}>
        <div className={`${classes.menuToggle}`} onClick={toggleExpand}>
          {isNavBarOpen ? <AiOutlineClose className={classes.whiteIcon} /> : <AiOutlineMenu />}
        </div>

        <ul className={`${classes.menuOptions} ${toggleMenu ? classes.expanded : ''}`}>
          {menuOptions.map((option, index) => (
            <li key={index} onClick={() => setToggleMenu(false)}>
              {toggleMenu ? (
                <>
                  <Link href={option.href}>
                    <div className={classes.link}>{option.icon}</div>
                    <p className={`${classes.optionName} ${classes.optionNameBold}`}>{option.text}</p>
                  </Link>
                </>
              ) : (
                <div className={classes.links2}>{option.icon}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpandableMenu;
