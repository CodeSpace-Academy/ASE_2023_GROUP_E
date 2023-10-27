// pages/search.js
// import SearchBar from '../components/SearchBar';
<<<<<<< HEAD
import getFilteredRecipes from '@/database/getFiltedRecipes';
import PreviewList from '@/component/Recipes/Preview/PreviewList';

const Search = ({Result}) => {

=======
import getFilteredRecipes from '@/database/getFilterRecipes';
import PreviewList from '@/component/Recipes/Preview/PreviewList';


const Search = ({Result}) => {


>>>>>>> 29e4f0bc7ad52b8ebbf947520671b513fddf53e0
  return (
    <div>
      <h1>Recipe Search</h1>
      {/* <SearchBar /> */}
      <PreviewList recipes={Result} />
    </div>
  );
};

<<<<<<< HEAD
=======

>>>>>>> 29e4f0bc7ad52b8ebbf947520671b513fddf53e0
export async function getServerSideProps(context){
  const SearchWord = context.params.categoriesPage
  const Result =  await getFilteredRecipes(0, {category: SearchWord})
  return {
   props:{
    Result,
   },
  }
}

<<<<<<< HEAD
export default Search;
=======

export default Search;


>>>>>>> 29e4f0bc7ad52b8ebbf947520671b513fddf53e0
