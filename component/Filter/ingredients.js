// component/Filter/ingredients
import React, { useState } from 'react';
import styles from './IngredientsList.module.css';

const IngredientsList = ({ recipes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleItem = (ingredient) => {
    if (selectedItems.includes(ingredient)) {
      setSelectedItems(selectedItems.filter((i) => i !== ingredient));
    } else {
      setSelectedItems([...selectedItems, ingredient]);
    }
  };

  return (
    <div className={styles.dropdownChecklist}>
      <div className={styles.dropdownToggle} onClick={toggleDropdown}>
        Toggle Dropdown
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {recipes &&
            recipes.map((ingredientObj, index) => {
              const ingredient = Object.keys(ingredientObj)[0];
              return (
                <div className={styles.item} key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(ingredient)}
                      onChange={() => toggleItem(ingredient)}
                    />
                    {ingredient}
                  </label>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default IngredientsList;
