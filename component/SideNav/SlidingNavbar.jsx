import React from 'react';
import { MdOutlineFastfood } from 'react-icons/md';
import Link from 'next/link';
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineSearch,
} from 'react-icons/ai';
import classes from './sideNav.module.css';
import StateContext from '@/useContext/StateContext';

const ExpandableMenu = () => {
  const { setToggleMenu, toggleMenu, setAddSkip } = StateContext();

  function skip() {
    localStorage.setItem('skipNo', 0);
    setAddSkip(0);
  }

  const toggleExpand = () => {
    setToggleMenu(!toggleMenu);
  };

  const Links = ({ link, text, click }) => (
    <Link href={link} onClick={click}>
      {text}
    </Link>
  );

  const menuOptions = [
    {
      icon: Links({ link: '/', text: <AiOutlineHome /> }),
      name: Links({ link: '/', text: 'Home' }),
    },
    {
      icon: Links({
        link: `/recipes-0-_id-asc`,
        text: <MdOutlineFastfood />,
        click: skip,
      }),
      name: Links({ link: `recipes`, text: 'Recipes' }),
    },
    {
      icon: Links({ link: '/favourites', text: <AiOutlineHeart /> }),
      name: Links({ link: '/favourites', text: 'Favourites' }),
    },
    {
      icon: Links({ link: '/profile', text: <AiOutlineUser /> }),
      name: Links({ link: '/profile', text: 'Profile' }),
    },
    {
      icon: Links({ link: '/', text: <AiOutlineSetting /> }),
      name: Links({ link: '/', text: 'Settings' }),
    },
    {
      icon: Links({ link: '/search', text: <AiOutlineSearch /> }),
      name: Links({ link: '/search', text: 'Search' }),
    },
  ];

  return (
    <div className={classes.pageContainer}>
      <div className={classes.expandableMenu}>
        <div className={`${classes.menuToggle}`} onClick={toggleExpand}>
          <AiOutlineMenu />
        </div>

        <ul
          className={`${classes.menuOptions} ${
            toggleMenu ? classes.expanded : ''
          }`}
        >
          {menuOptions.map((option, index) => (
            <li key={index} onClick={() => setToggleMenu(false)}>
              {toggleMenu ? (
                <>
                  <div className={classes.link}>{option.icon}</div>
                  {/* Increase the font size */}
                  <p className={classes.optionName}>{option.name}</p>
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
