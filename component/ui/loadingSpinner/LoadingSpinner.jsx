import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


/**
 * A React component displaying a loading spinner.
 * This component renders a CircularProgress spinner in a Box container, centered on the screen.
 * @returns {JSX.Element} LoadingSpinner component.
 */
export default function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '85vh', // Sets the height of the Box container to 85% of the viewport height
      }}
    >
      <CircularProgress /> {/* Renders the CircularProgress spinner */}
      </Box>
  );
}
