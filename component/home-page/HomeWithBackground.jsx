import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import classes from './HomeWithBackground.module.css';
import { useRouter } from 'next/router';
import { WhiteButton } from '../Button/button';
import StateContext from '@/useContext/StateContext';

/**
 * Landing page
 * @returns {JSX.Element} - the landing page.
 */

const HomeWithBackground = () => {
  const router = useRouter(); // Initialize the router for navigation.
  const { selecteTags, selectedIngredients, selectedCategory, selectedInstructionsOptions, andOr } = StateContext()

  return (
    <div>
      <Head>
        <title>{"Chef's Heaven"}</title>
      </Head>

      <div className={classes.backgroundImage}>
        {' '}
        {/* This div represents the background image container. */}
        {/*Links to the pages on the menu lists */}
        <div className={classes.menu}>
          <WhiteButton 
            text='View Recipes'
            click={() => router.push(`/recipes-0-id-asc_${selecteTags.map((item) => item.label).join(',')}_${selectedIngredients.map((item) => item.label).join(',')}_${selectedCategory == '' ? selectedCategory : selectedCategory.value}_${selectedInstructionsOptions}_${!andOr}`)}
          />

          <WhiteButton 
            text='Favourites'
            click={() => router.push(`/favourites`)}
          />

          <WhiteButton 
            text='Search'
            click={() => router.pushpush(`/recipes-0-id-asc_${selecteTags.map((item) => item.label).join(',')}_${selectedIngredients.map((item) => item.label).join(',')}_${selectedCategory == '' ? selectedCategory : selectedCategory.value}_${selectedInstructionsOptions}_${!andOr}`)}
          />

          <WhiteButton 
            text='Profile'
            click={() => alert('Being updated')}
          />

        </div>
      </div>
    </div>
  );
};

export default HomeWithBackground;
