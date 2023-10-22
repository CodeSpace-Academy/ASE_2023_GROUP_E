import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    // const { pathname } = useLocation();

    useEffect(() => {
        // first way..not working
        window.scrollTo(0, 0);

        // second way..still not working
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });

    }, [/* pathname */]);

    return null;
};

export default ScrollToTop;