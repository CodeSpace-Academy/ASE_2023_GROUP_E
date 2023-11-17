import React from 'react';
import { AiOutlineMenu, AiOutlineTags, AiOutlineHome, AiOutlineSetting, AiOutlineUser, AiOutlineHeart, AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import classes from './sideNav.module.css';
import { MdOutlineFastfood } from 'react-icons/md';
import StateContext from '@/useContext/StateContext';

const ExpandableMenu = () => {
  const { setToggleMenu, toggleMenu, setAddSkip } = StateContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu open/close

  function skip() {
    localStorage.setItem('skipNo', 0);
    setAddSkip(0);
  }

  const navigateTo = (path, clickFunction) => {
    setToggleMenu(false);
    if (clickFunction) clickFunction();
    // Navigate to path here, e.g., using router.push or window.location.href
    // Example with window.location.href:
    window.location.href = path;
  };

  const menuOptions = [
    { icon: <AiOutlineHome onClick={() => navigateTo('/')} />, name: 'Home' },
    { icon: <MdOutlineFastfood onClick={() => navigateTo('/recipes-0-_id-asc', skip)} />, name: 'All Recipes' },
    { icon: <AiOutlineHeart onClick={() => navigateTo('/favourites')} />, name: 'Favourites' },
    { icon: <AiOutlineUser onClick={() => navigateTo('/user')} />, name: 'User' },
    { icon: <AiOutlineSearch onClick={() => navigateTo('/search')} />, name: 'Search' },
    { icon: <AiOutlineSetting onClick={() => navigateTo('/')} />, name: 'Settings' },
  ];

  const toggleExpand = () => {
    setToggleMenu(!toggleMenu);
  };

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
                  <div className={classes.link}>{option.icon}</div>
                  <p className={classes.optionName}>{option.name}</p>
                </>
              ) : (
                <div className={classes.links2}>{option.icon}</div>
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
