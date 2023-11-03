import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const variants = ['h1', 'h1', 'h1', 'h1', 'h3', 'h4', 'h4'];

function TypographyDemo(props) {
  const { loading = false } = props;

  return (
    <div>
      {variants.map((variant) => {
        return (
          <Typography component="div" key={variant} variant={variant}>
            {loading && <Skeleton />}
          </Typography>
        );
      })}
    </div>
  );
}

TypographyDemo.propTypes = {
  // eslint-disable-next-line react/require-default-props
  loading: PropTypes.bool,
};

export default function SkeletonTypography() {
  return (
    <Grid container spacing={0} style={{ padding: '15px' }}>
      <Grid item xs>
        <TypographyDemo loading />
      </Grid>
      <Grid item xs>
        <TypographyDemo loading />
      </Grid>
    </Grid>
  );
}
