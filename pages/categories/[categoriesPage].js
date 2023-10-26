// pages/search.js
// import SearchBar from '../components/SearchBar';
import getFilteredRecipes from '@/database/getFiltedRecipes';
import PreviewList from '@/component/Recipes/Preview/PreviewList';


const Search = ({Result}) => {


  return (
    <div>
      <h1>Recipe Search</h1>
      {/* <SearchBar /> */}
      <PreviewList recipes={Result} />
    </div>
  );
};


export async function getServerSideProps(context){
  const SearchWord = context.params.categoriesPage
  const Result =  await getFilteredRecipes(0, {category: SearchWord})
  return {
   props:{
    Result,
   },
  }
}


export default Search;

