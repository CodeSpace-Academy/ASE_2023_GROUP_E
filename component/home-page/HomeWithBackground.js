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
               
                {/*Links to the pages on the menu lists */}
                <div className={classes.menu}>
                    <Link href={`/${50}`}>All Recipes</Link>  {/* Link to the "All Recipes" page with route parameter 100. */}
                    <Link href={'/tags'}>Tags List</Link>
                    <Link href="/favorites">Favorites</Link>
                    <Link href="/updated-recipes">Updated Recipes</Link>
                </div>
            </div>

        </div>
    );
};

export default HomeWithBackground;

