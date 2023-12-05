/*
File: index.js
Description: Renders Typography components with loading skeletons

This code snippet demonstrates the use of Material-UI components to render multiple text elements with loading animations.
*/

// Import necessary modules and components
import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import { v4 as uuidv4 } from 'uuid';

// Array of typography variants
const variants = ['h1', 'h1', 'h1', 'h1', 'h3', 'h4', 'h4'];

// TypographyDemo component that renders Typography components with Skeleton loading
function TypographyDemo(props) {
  const { loading = false } = props; // Accepts a loading prop, default is false

  return (
    <div>
      {/* Mapping through variants to render Typography components */}
      {variants.map((variant) => {
        const uniqueKey = uuidv4(); // Generate a unique key
        return (
          <Typography component="div" key={uniqueKey} variant={variant}>
            {/* Show Skeleton if loading is true */}
            {loading && <Skeleton />}
          </Typography>
        );
      })}
    </div>
  );
}

// PropTypes for TypographyDemo component
TypographyDemo.propTypes = {
  loading: PropTypes.bool,
};

// Default props for TypographyDemo component
TypographyDemo.defaultProps = {
  loading: false, // Set a default value for loading prop
};

// SkeletonTypography component that uses TypographyDemo component in a Grid layout
export default function SkeletonTypography() {
  return (
    // Grid layout with two TypographyDemo components
    <Grid container spacing={0} style={{ padding: '15px' }}>
      <Grid item xs>
        <TypographyDemo loading /> {/* Render TypographyDemo with loading prop */}
      </Grid>
      <Grid item xs>
        <TypographyDemo loading /> {/* Render TypographyDemo with loading prop */}
      </Grid>
    </Grid>
  );
}
