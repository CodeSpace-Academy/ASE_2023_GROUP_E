import React, { useState } from 'react';
import ExpandableMenu from "@/component/SideNav/SlidingNavbar";
import classes from './layout.module.css'
import StateContext from '@/useContext/StateContext';
import Image from 'next/image';

const LayoutAll = (props) => {

    const {toggleMenu} = StateContext()

    return (
        <div className={classes.background} >
            <div className={classes.layout}>
                <ExpandableMenu expanded={toggleMenu} />

                <div className={classes.imgDiv}>
                        <Image className={classes.img} src='/images/logo3.png' alt='Chefs Heaven Logo' width={270} height={100} />
                    </div> 

                <div className={toggleMenu ? classes.expanded : classes.expand}>

                    <div className={classes.children}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutAll;

