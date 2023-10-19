import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

async function addItem(item) {
  const response = await fetch('/api/insertData', {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

function EditDescription({info}) {
  const [newDescription, setNewDescription] = useState(info);

  const router = useRouter()
  const titleRouter = router.query.recipe

  async function addItemHandler() {
    try {
      await addItem({ recipeTitle: titleRouter, recipeDescription: newDescription });
    } catch (error) {
      console.log('Error adding item');
    }
  }
  
  return (
    <div>
      <textarea
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button onClick={addItemHandler}>Save</button>
    </div>
  );
}

export default EditDescription;

//Make and share this Low-Fat Berry Blue Frozen Dessert recipe from Food.com.
