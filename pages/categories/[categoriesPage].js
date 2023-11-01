import PreviewList from '@/component/Recipes/Preview/PreviewList';
import getRecipes from '@/database/getData/getRecipes';


const Search = ({Result}) => {


  return (
      <div>
        <h1>Recipe Search</h1>
        <PreviewList recipes={Result} />
      </div>
    );
  };

export async function getServerSideProps(context){
  const SearchWord = context.params.categoriesPage
  const Result =  await getRecipes({category: SearchWord}, 0, 5)

  return {
   props:{
    Result,
   },
  }
}

export default Search;