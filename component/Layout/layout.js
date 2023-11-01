import React, { useState, useEffect } from 'react';
import ExpandableMenu from "@/component/SideNav/SlidingNavbar";
import classes from './layout.module.css';
import StateContext from '@/useContext/StateContext';
import Image from 'next/image';

const LayoutAll = (props) => {
    const { toggleMenu } = StateContext();
    const [imgDivHeight, setImgDivHeight] = useState(50);

    // Listen for scroll events
    useEffect(() => {
        const handleScroll = () => {
            // Calculate the remaining height when scrolling down
            const remainingHeight = 50 - window.scrollY / 10; // Adjust the scroll factor as needed

            // Ensure the minimum height is 10vh
            setImgDivHeight(Math.max(remainingHeight, 30));
        };

        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);

        return () => {
            // Remove the scroll event listener when the component unmounts
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={classes.background} >
            <div className={classes.layout}>
                <ExpandableMenu expanded={toggleMenu} />

                <div
                    // className={classes.imgDiv}
                    // style={{ height: `${imgDivHeight}vh` }}
                >
                    <Image
                        // className={classes.img}
                        src='/images/logo3.png'
                        alt='Chefs Heaven Logo'
                        width={270}
                        height={100}
                    />
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