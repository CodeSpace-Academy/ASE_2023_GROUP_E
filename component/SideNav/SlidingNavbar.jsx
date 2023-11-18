import React from 'react';
import { AiOutlineMenu,AiOutlineTags, AiOutlineHome, AiOutlineSetting, AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai';
import classes from './sideNav.module.css';
import { MdOutlineFastfood,} from 'react-icons/md'
import StateContext from '@/useContext/StateContext';
import Link from 'next/link';
import { IoMdClose } from "react-icons/io";

function Links(link, text, click){
  return (
    <Link href={link} onClick={click}>{text}</Link>
  )
}
const ExpandableMenu = () => {
  const {setToggleMenu, toggleMenu, setAddSkip, selecteTags} = StateContext()
function skip(){
  localStorage.setItem("skipNo", 0)
  setAddSkip(0)
}
  const toggleExpand = () => {
    setToggleMenu(!toggleMenu);
  };
  const menuOptions = [
    { icon: Links('/',  <AiOutlineHome /> ) , name: Links('/', 'Home')},
    { icon: Links(`/recipes-0-_id-asc_${selecteTags.map((item) => item.label).join(',')}`, <MdOutlineFastfood />, skip ), name: Links(`recipes`, 'All Recipes') },
    { icon: Links('/favourites',  <AiOutlineHeart />), name: Links('/favourites', 'Favourites') },
    { icon: Links(`/recipes-0-_id-asc_${selecteTags.map((item) => item.label).join(',')}`,  <AiOutlineSearch />), name: Links('/recipes-0-_id-asc', 'Search') },
    { icon: Links('/profile', <AiOutlineUser />) , name: Links('/profile', 'User') },
    { icon: Links('/', <AiOutlineSetting />) , name: Links('/', 'Settings')  },
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

      <div className={classes.mobileMenu}>
          {
            menuOptions.map((option) => (
              <p>{option.icon}</p>
            ))
          }
      </div>
    </div>
  );
};
export default ExpandableMenu;