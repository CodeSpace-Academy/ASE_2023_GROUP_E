import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import classes from '../home-page/HomeWithBackground.module.css';
import { WhiteButton } from '../Button/button';
// Import the StateContext for accessing global state.
import StateContext from '../../useContext/StateContext';

/**
 * Landing page
 * @returns {JSX.Element} - the landing page.
 */

function HomeWithBackground() {
  const router = useRouter(); // Initialize the router for navigation.
  // Destructure values from the global state using the StateContext.
  const {
    selecteTags,
    selectedIngredients,
    selectedCategory,
    selectedInstructionsOptions,
    andOr,
  } = StateContext();

  return (
    <div>
      {/* Head component for setting metadata, including the title of the page. */}

      <Head>
        <title>Chef's Heaven</title>
      </Head>
      <div className={classes.backgroundImage}>
        {' '}
        {/* This div represents the background image container. */}
        {/* Links to the pages on the menu lists */}
        <div className={classes.menu}>
          {/* WhiteButton component for navigating to the 'View Recipes' page. */}
          <WhiteButton
            text="View Recipes"
               // Use the router to navigate to the specified URL based on user selections.
            click={() => { return router.push(`/recipes-0-id-asc_${selecteTags.map((item) => { return item.label; }).join(',')}_${selectedIngredients.map((item) => { return item.label; }).join(',')}_${selectedCategory == '' ? selectedCategory : selectedCategory.value}_${selectedInstructionsOptions}_${!andOr}`); }}
          />
          {/* WhiteButton component for navigating to the 'Favourites' page. */}
          <WhiteButton
            text="Favourites"
            click={() => { return router.push('/favourites'); }}
          />
          {/* WhiteButton component for handling the 'Profile' button click. */}
          <WhiteButton
            text="Profile"
             // Display an alert indicating that the 'Profile' page is being updated.
            click={() => { return alert('Being updated'); }}
          />

        </div>
      </div>
    </div>
  );
}

export default HomeWithBackground;
