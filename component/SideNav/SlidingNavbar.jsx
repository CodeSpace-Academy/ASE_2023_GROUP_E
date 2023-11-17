import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineHome, AiOutlineHeart, AiOutlineUser, AiOutlineSetting, AiOutlineSearch } from 'react-icons/ai';
import classes from './sideNav.module.css';
import StateContext from '@/useContext/StateContext';
import Link from 'next/link';
import { IoMdClose } from 'react-icons/io';

// const MenuItem = ({ icon, name, href }) => {
//   return (
//     <Link href={href}>
//       <div classname={classes.a}>
//         {icon} {name}
//       </div>
//     </Link>
//   );
// };

const ExpandableMenu = () => {
  const { setToggleMenu, toggleMenu } = StateContext();
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const toggleExpand = () => {
    setToggleMenu(!toggleMenu);
    setIsNavBarOpen(!isNavBarOpen);
  };

  const menuOptions = [
    { icon: <AiOutlineHome />, name: 'Home', href: '/' },
    { icon: <AiOutlineUser />, name: 'User', href: '/user' },
    { icon: <AiOutlineHeart />, name: 'Favourites', href: '/favourites' },
    { icon: <AiOutlineSearch />, name: 'Search', href: '/search' },
    { icon: <AiOutlineSetting />, name: 'Settings', href: '/settings' },
  ];

  return (
    <div className={classes.pageContainer}>
      <div className={classes.expandableMenu}>
        <div className={`${classes.menuToggle}`} onClick={toggleExpand}>
          {toggleMenu ? <IoMdClose /> : <AiOutlineMenu />}
        </div>

        <ul className={`${classes.menuOptions} ${toggleMenu ? classes.expanded : ''}`}>
          {menuOptions.map((option, index) => (
            <li key={index} onClick={() => setToggleMenu(false)}>
              <Link href={option.href}>
                <MenuItem icon={option.icon} name={option.name} href={option.href} />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={classes.mobileMenu}>
        {menuOptions.map((option, index) => (
          <p key={index}>
            <Link href={option.href}>
              <div>{option.icon}</div>
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default ExpandableMenu;
