/*Description: Error message component to display error messages*/
import React from 'react';
import classes from './ErrorMessage.module.css';
/**
 * Error message component that takes in  an error message and displays it.
 * @param {string} message - The error message to be displayed
 * @returns {JSX.Element} - Returns a JSX element representing the error message
 */
export default function ErrorMessage({ message }) {
  return (
    <div className={classes.error}>
      <p>{message}</p>
    </div>
  );
}
