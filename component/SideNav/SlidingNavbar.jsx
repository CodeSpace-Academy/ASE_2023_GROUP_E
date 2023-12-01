import React from 'react';
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineHeart,
} from 'react-icons/ai';
import classes from './sideNav.module.css';
import { MdOutlineFastfood } from 'react-icons/md';
import StateContext from '@/useContext/StateContext';
import Link from 'next/link';
import { IoIosArrowDropleft, IoIosArrowForward } from 'react-icons/io';

/**
 * Function to create Links using the Link component from Next.js
 * @param {React.ReactNode} text - The content or child components of the link
 * @param {Function} click - The click event handler for the link
 * @returns {React.ReactElement} - The Link component
 */
function Links(link, text, click) {
  return (
    <Link href={link} onClick={click}>
      {text}
    </Link>
  );
}

/**
 * Main component for the expandable menu
 * @returns {React.ReactElement} - The ExpandableMenu component
 */
const ExpandableMenu = () => {
  // Destructuring values from the StateContext
  const {
    setToggleMenu,
    toggleMenu,
    selecteTags,
    selectedIngredients,
    selectedCategory,
    selectedInstructionsOptions,
    andOr,
    searchText
  } = StateContext();

  // Constructing the path based on selected options
  const path = `/recipes-0-id-asc_${selecteTags
    .map((item) => item.label)
    .join(',')}_${selectedIngredients
    .map((item) => item.label)
    .join(',')}_${selectedCategory == '' ? selectedCategory : selectedCategory.value}_${selectedInstructionsOptions}_${!andOr}_${searchText}_chefsHeaven`;

  /**
   * Function to toggle the menu's expansion
   */
  const toggleExpand = () => {
    setToggleMenu(!toggleMenu);
  };

  // Adjusted arrowIcon based on the toggleMenu state
  const arrowIcon = toggleMenu ? <IoIosArrowDropleft /> : <IoIosArrowForward />;

  const menuOptions = [
    { icon: Links('/', <AiOutlineHome />), name: Links('/', 'Home') },
    {
      icon: Links(path, <MdOutlineFastfood />),
      name: Links(path, 'All Recipes'),
    },
    {
      icon: Links('/favourites', <AiOutlineHeart />),
      name: Links('/favourites', 'Favourites'),
    },
    {
      icon: Links(path, <AiOutlineUser />),
      name: Links(path, 'User'),
    },
    { icon: Links(path, <AiOutlineSetting />), name: Links(path, 'Settings') },
  ];

  return (
    <div className={classes.pageContainer}>
      <div className={classes.expandableMenu}>
        <div className={`${classes.menuToggle}`} onClick={toggleExpand}>
          {arrowIcon}
        </div>
        {/* List of menu options */}
        <ul className={`${classes.menuOptions} ${toggleMenu ? classes.expanded : ''}`}>
          {menuOptions.map((option, index) => (
            <li key={index} onClick={() => setToggleMenu(false)}>
              {toggleMenu ? (
                // Displayed when the menu is expanded
                <>
                  <div className={classes.link}>{option.icon}</div>{' '}
                  {/* Increase the font size */}
                  <p className={classes.optionName}>{option.name}</p>
                </>
              ) : (
                // Displayed when the menu is collapsed
                <div className={classes.links2}>
                  {option.icon}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* Placeholder for additional content */}
      <div className={classes.mobileMenu}>
        {menuOptions.map((option) => (
          <p>{option.icon}</p>
        ))}
      </div>
    </div>
  );
};

export default ExpandableMenu;
