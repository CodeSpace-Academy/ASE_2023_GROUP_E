import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

// Array containing different typography variants
const variants = ['h1', 'h1', 'h1', 'h1', 'h3', 'h4', 'h4'];

/**
 * Displays Typography with Skeleton loading.
 * @param {object} props - Loading state prop.
 * @returns {JSX.Element} - TypographyDemo component.
 */
function TypographyDemo(props) {
  // Destructuring loading prop from props
  const { loading = false } = props;

  return (
    // Render a div containing Typography elements based on variants array
    <div>
      {variants.map((variant, index) => {
        return (
          // Each Typography element with a unique key and specified variant
          <Typography component="div" key={`${variant}-${index}`} variant={variant}>
          {/* Display Skeleton component if loading prop is true */}  
          {loading && <Skeleton />}
          </Typography>
        );
      })}
    </div>
  );
}

// PropTypes definition for TypographyDemo component
TypographyDemo.propTypes = {
  loading: PropTypes.bool,
};

/**
 * Renders TypographyDemo within Grid items.
 * @returns {JSX.Element} - SkeletonTypography component.
 */
export default function SkeletonTypography() {
  return (
    // Grid container with padding and no spacing
    <Grid container spacing={0} style={{ padding: '15px' }}>
      {/* First Grid item containing TypographyDemo with loading prop */}
      <Grid item xs>
        <TypographyDemo loading />
      </Grid>
      {/* Second Grid item containing TypographyDemo with loading prop */}
      <Grid item xs>
        <TypographyDemo loading />
      </Grid>
    </Grid>
  );
}