import React from 'react';
import classes from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className={classes.error}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
