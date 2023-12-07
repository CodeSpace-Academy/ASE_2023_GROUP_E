/*
Description: Scrolls the window to the top on component mount/update

This component is designed to scroll the window to the top whenever it's mounted or updated. It's commonly used in React applications to ensure that when a user navigates to a new page or route, the page view starts from the top.
*/

import { useEffect } from "react";


const ScrollToTop = () => {
    // const { pathname } = useLocation();

    useEffect(() => {
        // first attenmpt..not working
        window.scrollTo(0, 0);

        // second attempt..still not working
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });

    }, [/* pathname */]); //Runs only on initial component mount, no dependencies specified

    return null; // Renders nothing
};

export default ScrollToTop;