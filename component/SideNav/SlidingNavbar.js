import React from 'react';

import { AiOutlineMenu,AiOutlineTags, AiOutlineHome, AiOutlineSetting, AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai';
import classes from './sideNav.module.css';
import { MdOutlineFastfood,} from 'react-icons/md'
import StateContext from '@/useContext/StateContext';
import Link from 'next/link';

function Links(link, text, click){
  return (
    <Link href={link} onClick={click}>{text}</Link>
  )
}


const ExpandableMenu = () => {
  const {setToggleMenu, toggleMenu} = StateContext()

function skip(){
  return localStorage.setItem("skipNo", 0)
}


  const toggleExpand = () => {
    setToggleMenu(!toggleMenu);
  };

  const menuOptions = [
    { icon: Links('/',  <AiOutlineHome /> ) , name: Links('/', 'Home')},
    { icon: Links('/profile', <AiOutlineUser />) , name: Links('/profile', 'Profile') },
    { icon: Links(`/recipes`, <MdOutlineFastfood />, skip ), name: Links(`recipes`, 'Recipes') },
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
