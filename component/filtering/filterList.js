import React, { useState} from 'react';
import { useRouter } from 'next/router';
import styles from './filter.module.css'


export default function RecipeFilter({ onClose, sortDate }) {
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [numOfInstructions, setNumOfInstructions] = useState('');


  const router = useRouter();


  const clearFilters = () => {
    setCategories('');
    setTags('');
    setIngredients('');
    setNumOfInstructions('');
  };


  const applyFilters = () => {
    const filter = {
      categories: categories || undefined, // Set to undefined if empty
      tags: tags || undefined, // Set to undefined if empty
      ingredients: ingredients || undefined, // Set to undefined if empty
      numOfInstructions: numOfInstructions || undefined, // Set to undefined if empty
    };


    // Redirect to the filtered page
    router.push(`/filtering/${JSON.stringify(filter)}`);
  };


  return (
    <div className={styles.container}>
      <button onClick={onClose} className={styles.closeButton}>
        Close
      </button>
      <input
        type="text"
        placeholder="Categories"
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className={styles.input}
      />
   <input
        type="number"
        placeholder="Number of Instructions"
        value={numOfInstructions}
        onChange={(e) => {
          const newValue = parseInt(e.target.value, 10);
          setNumOfInstructions(isNaN(newValue) ? 0 : Math.max(0, newValue)); // Ensure the minimum value is 0
        }}
        className={styles.input}
      />
      <button onClick={sortDate}>
        Sort by Date
      </button>
      <button onClick={clearFilters} className={styles.button}>
      clearFilters
      </button>
      <button onClick={applyFilters} className={styles.button}>
        Apply
      </button>
    </div>
  );
};


