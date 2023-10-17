import React, { useState } from 'react';
import { FaAngleRight, FaHome, FaCog, FaUser, FaBell } from 'react-icons/fa';
import classes from './sideNav.module.css'

const ExpandableMenu = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const menuOptions = [
    { icon: <FaHome />, name: 'Home' },
    { icon: <FaCog />, name: 'Settings' },
    { icon: <FaUser />, name: 'Profile' },
    { icon: <FaBell />, name: 'Notifications' },
  ];

  return (
    <div className={classes.pageContainer}>
      <div className={classes.expandableMenu}>
        <div className={`${classes.menuToggle} ${expanded ? 'expanded' : ''}`} onClick={toggleExpand}>
          <FaAngleRight />
        </div>
        <ul className={`${classes.menuOptions} ${expanded ? classes.expanded : ''}`}>
          {menuOptions.map((option, index) => (
            <li key={index}>
              {expanded ? (
                <>
                  {option.icon}
                  {option.name}
                </>
              ) : (
                option.icon
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.content}>
        {/* Add your page content here */}
        <h1>Chef's Haven</h1>
        <p>🧑‍🍳</p>
        

      </div>
    </div>
  );
};

export default ExpandableMenu;
