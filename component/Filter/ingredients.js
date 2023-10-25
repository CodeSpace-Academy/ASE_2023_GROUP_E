import React, { useState } from 'react';

const IngredientsList = ({ recipes }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
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
