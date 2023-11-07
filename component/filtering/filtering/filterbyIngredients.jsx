import { useEffect, useState } from 'react';
import StateContext from '../../../useContext/StateContext';
import CustomizedHook from './filterForm';
import { BlueButton } from '../../Button/button';

export default function FilterbyIngredients() {
  const { setFilteredResults, total, setTotal } = StateContext();
  const [ingredients, setIngredients] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  /**
   * control whether the the ingredient will filter all the recipes that includes the selected
   * ingredients or filters ingredients that includes atleast one of the inputs
   */
  const [andOr, setandOr] = useState(false);

  useEffect(() => {
    fetch('/api/filtering/filterOptions/selectOptions?object=ingredients')
      .then((res) => { return res.json(); })
      .then((data) => {
        if (data) {
        /**
           * Fetches the ingredients which is an array objects.
           * maps over this array to abstracts the object keys
           */
          const allIngredients = data.recipes.map((item) => {
            return Object.keys(item.ingredients);
          });
          /**
           * {@link allIngredients} is an array of arrays
           * which is then combined
           */
          const slitIngredients = allIngredients.join().split(',');
          /**
           * The combined array is then checked to remove any duplicates
           * then sent into a state
           */
          const uniqueIngredients = [...new Set(slitIngredients)];
          setIngredients(uniqueIngredients);
        }
      });
  }, [ingredients]);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const selected = selectedOptions.map((item) => { return item.value; }).join(',');

  useEffect(() => {
    if (selectedOptions.length > 0) {
      fetch(`/api/filtering/filterOptions/filterIngredients?selected=${selected}&andOr=${andOr ? '$or' : '$and'}`)
        .then((res) => { return res.json(); })
        .then((data) => {
          setFilteredResults(data && data.recipes[0]);
          setTotal(total + data && data.recipes[1]);
        });
    }
  }, [selectedOptions, andOr, selected, setFilteredResults, setTotal, total]);

  return (
    <>
      <BlueButton
        text="switch"
        // color="warning"
        click={() => { setandOr(!andOr); }}
      />
      <CustomizedHook
        options={ingredients}
        filter="Filter Ingredients"
        handleSelectChange={handleSelectChange}
        selectedOptions={selectedOptions}
      />
    </>
  );
}
