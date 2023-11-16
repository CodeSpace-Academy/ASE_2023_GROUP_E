import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineHome, AiOutlineHeart, AiOutlineUser, AiOutlineSetting, AiOutlineSearch } from 'react-icons/ai';
import classes from './sideNav.module.css';
import StateContext from '@/useContext/StateContext';
import Link from 'next/link';
import { IoMdClose } from "react-icons/io";

const ExpandableMenu = () => {
  const { setToggleMenu, toggleMenu } = StateContext();
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const toggleExpand = () => {
    setToggleMenu(!toggleMenu);
    setIsNavBarOpen(!isNavBarOpen);
  };

  const menuOptions = [
    { icon: <AiOutlineHome />, href: '/', text: 'Home' },
    { icon: <AiOutlineUser />, href: '/profile', text: 'Profile' },
    { icon: <AiOutlineHeart />, href: '/favourites', text: 'Favourites' },
    { icon: <AiOutlineSetting />, href: '/', text: 'Settings' },
  ];

  return (
    <div className={classes.pageContainer}>
      <div className={classes.expandableMenu}>
        <div className={`${classes.menuToggle}`} onClick={toggleExpand}>
          {toggleMenu ?  <IoMdClose /> : <AiOutlineMenu />}
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
      
      <div className={classes.mobileMenu}>
        {menuOptions.map((option, index) => (
          <p key={index}>{option.icon}</p>
        ))}
      </div>
    </div>
  );
};

export default ExpandableMenu;
