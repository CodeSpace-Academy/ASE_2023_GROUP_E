import StateContext from "@/useContext/StateContext";
import { useEffect, useState } from "react";
import CustomizedHook from "./filterForm";
import { BlueButton } from "@/component/Button/button";

export default function FilterbyIngredients() {
  const { setFilteredResults, filteredResults, total, setTotal } = StateContext();
  const [ingredients, setIngredients] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [andOr, setAndOr] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch('/api/filtering/filterOptions/selectOptions?object=ingredients')
      .then(res => res.json())
      .then(data => {
        if (data) {
          const allIngredients = data.recipes.map((item) => Object.keys(item.ingredients));
          const slitIngredients = allIngredients.join().split(',');
          const uniqueIngredients = [...new Set(slitIngredients)];
          setIngredients(uniqueIngredients);
        }
      });
  }, [ingredients]);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const selected = selectedOptions.map((item) => item.value).join(',');

  useEffect(() => {
    if (selectedOptions.length > 0) {
      fetch(`/api/filtering/filterOptions/filterIngredients?selected=${selected}&andOr=${andOr ? '$or' : '$and'}`)
        .then(res => res.json())
        .then(data => {
          setFilteredResults(data && data.recipes[0]);
          setTotal(total + data && data.recipes[1]);
          const newUrl = `/findstay?Ingredients=${selected}`; // to change the url
          window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
        });
    }
  }, [selectedOptions, andOr]);

  return (
    <>
      <BlueButton
        click={() => setAndOr(!andOr)}
        text={andOr ? 'Includes all' : 'Includes one'}
      />

      <CustomizedHook
        options={ingredients}
        filter={'Filter Ingredients'}
        handleSelectChange={handleSelectChange}
        selectedOptions={selectedOptions}
      />
    </>
  );
}
