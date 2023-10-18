import ExpandableMenu from "@/component/SideNav/SlidingNavbar";
import classes from '../component/SideNav/sideNav.module.css'

import React from 'react';

const LayoutAll = (props) => {
    return (
        <div>
            {
            
            /* Any content you want to include in the layout */
          <div>
            <ExpandableMenu/>
          </div>
            
            
                        }
           <div className={classes.content}>
            {props.children}
            </div>
                    
             </div>
    );
}

export default LayoutAll;