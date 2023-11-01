import React, { useState } from 'react';
import styles from './filter.module.css';

const RecipeFilter = ({ onClose, sortDate }) => {
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [numOfInstructions, setNumOfInstructions] = useState('');

  const clearFilters = () => {
    setCategories('');
    setTags('');
    setIngredients('');
    setNumOfInstructions('');
  };

  const applyFilters = () => {
    // Implement your filter logic here
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
        onChange={(e) => setNumOfInstructions(e.target.value)}
        className={styles.input}
      />
        <button onClick={sortDate}>
          Sort by Date
        </button>
      <button onClick={clearFilters} className={styles.button}>
        Clear All Filters
      </button>
      <button onClick={applyFilters} className={styles.button}>
        Apply
      </button>

          </div>
  );
};

export default RecipeFilter;
