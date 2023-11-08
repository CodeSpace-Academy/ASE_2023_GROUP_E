import PreviewList from '@/component/Recipes/Preview/PreviewList';
import getRecipes from '@/database/getData/getRecipes';
import classes from './category.module.css'
import { LinkButton } from '@/component/Button/button';

const Search = ({recipes}) => {

 

  if (recipes.length == 0){
    return <p>No results</p>
  }

  return (
      <div>
        <div className={classes.backgroundImage}>
          <h1 className={classes.title}>Category Results</h1>
          <div className={classes.buttonClear}>
          <LinkButton path={'/recipes-0-_id-asc'} text='Clear applied filter' />
          </div>
          
        </div>
        
     
        <PreviewList recipes={recipes}/>
      </div>

    );
  };

          export async function getServerSideProps(context){
          const SearchWord = context.params.categoriesPage
          const {recipes} =  await getRecipes({category: SearchWord}, 0, 5)

            return {
            props:{
              recipes,
            },
            }
          }

export default Search;