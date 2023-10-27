// pages/search.js
// import SearchBar from '../components/SearchBar';
import getFilteredRecipes from '@/database/getFilterRecipes';
import PreviewList from '@/component/Recipes/Preview/PreviewList';
import classes from './categories.module.css'

const Search = ({Result}) => {


  return (
    <div>
      <h1 className={classes.title}>Recipe Search</h1>
      {/* <SearchBar /> */}
      <PreviewList recipes={Result} />
    </div>
  );
};


export async function getServerSideProps(context){
  const SearchWord = context.params.categoriesPage
  const Result =  await getFilteredRecipes({category: SearchWord}, 0)
  return {
   props:{
    Result,
   },
  }
}


export default Search;


