import React, { useState } from 'react';

function EditDescription({ onSave, onClose }) {
  const [newDescription, setNewDescription] = useState("");

  const handleSave = () => {
    onSave(newDescription);
    onClose();
  };

  return (
    <div>
      <textarea
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default EditDescription;
