import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import classes from './HomeWithBackground.module.css'
import { useRouter } from 'next/router';


const HomeWithBackground = () => {

    const router = useRouter() // Initialize the router for navigation.

    return (
        <div>
            <Head>
                <title>{"Chef's Heaven"}</title>
            </Head>

            <div className={classes.backgroundImage}> {/* This div represents the background image container. */}
                <div className={classes.logoimage}> {/*logo image class */}
                    <Image src='/images/logo3.png' alt='Chefs Heaven Logo' width={270} height={100} /> {/* Display the website logo. */}
                </div>
                {/*Links to the pages on the menu lists */}
                <div className={classes.menu}>
                    <Link href={`/${100}`}>All Recipes</Link>  {/* Link to the "All Recipes" page with route parameter 100. */}
                    <Link href={'/tags'}>Tags List</Link>
                    <Link href="/favorites">Favorites</Link>
                    <Link href="/updated-recipes">Updated Recipes</Link>

                </div>
            </div>

        </div>
    );
};

export default HomeWithBackground;

