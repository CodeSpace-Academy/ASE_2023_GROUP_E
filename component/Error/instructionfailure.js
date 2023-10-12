
// components/instructionfailure.js

import React from 'react';

function Error({ message }) {
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  );
}

export default Error;
// instructionfailure.js

export class instructionfailure {
    static handleRecipeInstructionError(error) {
      if (error.message === 'Failed to load instructions') {
        // Display the error message to the user or take appropriate action
        console.error('Failed to load instructions. Please try again later.');
      } else {
        // Handle other types of errors as needed
        console.error('An unexpected error occurred:', error);
      }
    }
  }
  