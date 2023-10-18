import React, { useState } from 'react';
import ExpandableMenu from "@/component/SideNav/SlidingNavbar";
import classes from '../component/SideNav/sideNav.module.css'
import StateContext from '@/useContext/StateContext';

const LayoutAll = (props) => {

    const toggleSidebar = () => {
        setToggleMenu(!toggleMenu);
    }

    const {setToggleMenu, toggleMenu} = StateContext()

    return (
        <div>
            <div className={classes.layout}>
                <ExpandableMenu expanded={toggleMenu} />

                <div style={{ marginLeft: toggleMenu ? '150px' : '80px' }}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default LayoutAll;

