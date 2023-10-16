// InstructionLoadFailure.js

import React from 'react';

function InstructionLoadFailure({ message }) {
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  );
}

export default InstructionLoadFailure;
