// pages/filterData/index.js
import IngredientsFilter from '@/component/Filter/ingredientsFilter';
import { fetchIngredients } from '@/database/filterData';

const FilterData = ({ ingredients }) => {
  return (
    <div>
      <IngredientsFilter ingredients={ingredients} />
    </div>
  );
};

export default FilterData;

export async function getStaticProps() {
  
}
