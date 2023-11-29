import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import { v4 as uuidv4 } from 'uuid';

const variants = ['h1', 'h1', 'h1', 'h1', 'h3', 'h4', 'h4'];

function TypographyDemo(props) {
  const { loading = false } = props;

  return (
    <div>
      {variants.map((variant) => {
        const uniqueKey = uuidv4(); // Generate a unique key
        return (
          <Typography component="div" key={uniqueKey} variant={variant}>
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

TypographyDemo.defaultProps = {
  loading: false, // Set a default value for loading prop
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
