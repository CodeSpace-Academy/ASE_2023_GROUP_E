import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const variants = ['h1', 'h1', 'h1', 'h1', 'h3', 'h4', 'h4'];

function TypographyDemo(props) {
  const { loading = false } = props;

  return (
    <div>
      {variants.map((variant, index) => {
        return (
          <Typography component="div" key={`${variant}-${index}`} variant={variant}>
            {loading && <Skeleton />}
          </Typography>
        );
      })}
    </div>
  );
}

TypographyDemo.propTypes = {
  loading: PropTypes.bool,
};

export default function SkeletonTypography() {
  return (
    <Grid container spacing={0} style={{ padding: '15px' }}>
      {/* First Grid item containing TypographyDemo with loading prop */}
      <Grid item xs>
        <TypographyDemo loading />
      </Grid>
      <Grid item xs>
        <TypographyDemo loading />
      </Grid>
    </Grid>
  );
}