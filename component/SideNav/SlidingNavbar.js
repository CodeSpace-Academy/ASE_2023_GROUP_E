import React from 'react';
import { AiOutlineMenu,AiOutlineTags, AiOutlineHome, AiOutlineSetting, AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai';
import classes from './sideNav.module.css';
import { MdOutlineFastfood,} from 'react-icons/md'
import StateContext from '@/useContext/StateContext';
import Link from 'next/link';

// Function to create Links using the Link component from Next.js
function Links(link, text, click){
  return (
    <Link href={link} onClick={click}>{text}</Link>
  )
}


const ExpandableMenu = () => {
  // Destructuring values from the StateContext
  const {setToggleMenu, toggleMenu, setAddSkip} = StateContext()
  // Function to reset skip counter
function skip(){
  localStorage.setItem("skipNo", 0)
  setAddSkip(0)
}


  const toggleExpand = () => {
    setToggleMenu(!toggleMenu);
  };
 // Array of menu options with corresponding icons and names
  const menuOptions = [
    { icon: Links('/',  <AiOutlineHome /> ) , name: Links('/', 'Home')},
    { icon: Links('/profile', <AiOutlineUser />) , name: Links('/profile', 'Profile') },
    { icon: Links(`/recipes-0-_id-asc`, <MdOutlineFastfood />, skip ), name: Links(`recipes`, 'Recipes') },
    { icon: Links('/tags', <AiOutlineTags/>) , name: Links('/tags', 'Tags')},
    { icon: Links('/favourites',  <AiOutlineHeart />), name: Links('/favourites', 'Favourites') },
    { icon: Links('/search',  <AiOutlineSearch />), name: Links('/search', 'Search') },
    { icon: Links('/', <AiOutlineSetting />) , name: Links('/', 'Settings')  },
  ];

  return (
    <div className={classes.pageContainer}>
      <div className={classes.expandableMenu}>
        <div className={`${classes.menuToggle}`} onClick={toggleExpand}>
          <AiOutlineMenu />
        </div>
    {/* List of menu options */}
        <ul className={`${classes.menuOptions} ${toggleMenu ? classes.expanded : ''}`}>
          {menuOptions.map((option, index) => (
            <li key={index} onClick={() => setToggleMenu(false)}>
              {toggleMenu ? (
                  // Displayed when the menu is expanded
                <>
                  <div className={classes.link}>{option.icon}</div> {/* Increase the font size */}
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
      <div className={`${classes.content} ${toggleMenu ? '' : classes.contentClose}`}>
      </div>
    </div>
  );
};

export default ExpandableMenu;
