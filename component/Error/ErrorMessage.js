import React from 'react';
import classes from './ErrorMessage.module.css';
/**
 * Error message component that takes in  an error message and displays it.
 * @param {string} message
 * @returns
 */
const ErrorMessage = ({ message }) => {
  return (
    <div className={classes.error}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
