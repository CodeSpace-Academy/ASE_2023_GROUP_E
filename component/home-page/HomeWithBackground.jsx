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
    searchText,
  } = StateContext();

  return (
    
    <div>
      {/* Head component for setting metadata, including the title of the page. */}

      <Head>
        <title>Chef's Heaven</title>
      </Head>
      <div className={classes.backgroundImage}>
      <div className={classes.context}>
          <div className={classes.content}>
          <h1 className={classes.text}>Welcome to Chef's Heaven!</h1>
          </div>
            <p className={classes.par}> Welcome to Chef's Heaven, where culinary dreams come to life! Dive into a world of mouthwatering recipes, 
            expert tips, and culinary inspiration. Whether you're a seasoned chef or a kitchen novice, our diverse collection of 
             recipes caters to every taste and skill level. Join our vibrant community, explore delicious possibilities, and let Chef's Heaven 
             be your go-to destination for all things delicious. Happy cooking!
            </p>
          </div>
        {' '}
        {/* This div represents the background image container. */}
        {/* Links to the pages on the menu lists */}
        <div className={classes.menu}>
          {/* WhiteButton component for navigating to the 'View Recipes' page. */}
          <WhiteButton
            text="View Recipes"
               // Use the router to navigate to the specified URL based on user selections.
            click={() => { return router.push(`/recipes-0-id-asc_${selecteTags.map((item) => { return item.label; }).join(',')}_${selectedIngredients.map((item) => { return item.label; }).join(',')}_${selectedCategory == '' ? selectedCategory : selectedCategory.value}_${selectedInstructionsOptions}_${!andOr}_${searchText}_chefsHeaven`); }}
          />
          {/* WhiteButton component for navigating to the 'Favourites' page. */}
          <WhiteButton
            text="Favourites"
            click={() => { return router.push('/favourites'); }}
          />
        </div>
        
      </div>
    </div>
  );
}

export default HomeWithBackground;
