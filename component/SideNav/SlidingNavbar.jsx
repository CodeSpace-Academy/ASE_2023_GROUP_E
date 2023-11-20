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
  const {setToggleMenu, toggleMenu, setAddSkip, selecteTags, selectedIngredients, selectedCategory, selectedInstructionsOptions, andOr} = StateContext()
  const path = `/recipes-0-id-asc_${selecteTags.map((item) => item.label).join(',')}_${selectedIngredients.map((item) => item.label).join(',')}_${selectedCategory == '' ? selectedCategory : selectedCategory.value}_${selectedInstructionsOptions}_${!andOr}`
  
function skip(){
  localStorage.setItem("skipNo", 0)
  setAddSkip(0)
}
  const toggleExpand = () => {
    setToggleMenu(!toggleMenu);
  };
  const menuOptions = [
    { icon: Links('/',  <AiOutlineHome /> ) , name: Links('/', 'Home')},
    { icon: Links(path, <MdOutlineFastfood />, skip ), name: Links(path, 'All Recipes') },
    { icon: Links('/favourites',  <AiOutlineHeart />), name: Links('/favourites', 'Favourites') },
    { icon: Links(path,  <AiOutlineSearch />), name: Links('/recipes-0-id-asc____0_false', 'Search') },
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