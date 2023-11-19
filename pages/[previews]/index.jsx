'use client';
import PreviewList from '@/component/Recipes/Preview/PreviewList';
import { useState, useEffect, useMemo } from 'react';
import SearchBar from '@/component/filtering/searchCategories/categorySearch';
import StateContext from '@/useContext/StateContext';
import FilterbyTags from '@/component/filtering/filtering/filterbyTags';
import { useRouter } from 'next/router';
import FilterbyIngredients from '@/component/filtering/filtering/filterbyIngredients';
import SearchAndFilterHero from '@/component/filtering/searchAndFilterHero/searchAndFilterHero';
import { WhiteButton } from '@/component/Button/button';
import { Pagination } from 'flowbite-react';
import FilterbyInstructions from '@/component/filtering/filtering/filterbyInstructions';
import { Spinner } from 'flowbite-react';
import ErrorMessage from '@/component/Error/ErrorMessage';
import Image from 'next/image';
import { getRecipes } from '@/database/getData/getFilteredResults';
import { parseInt } from 'lodash';

export default function AllRecipes({error, recipes, totalRecipes}) {

  if(error){
    return (
      <div style={{ textAlign: 'center', marginTop:'100px'}}>
        <Spinner />
        <ErrorMessage message={error}/>
      </div>
    )
  }

  const router = useRouter();
  // const [results, setResults] = useState(null);
  const [sortField, setSortField] = useState('id'); // Default sort field
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order
  const { filteredResults, total, setSelectedIngredients, setSelectedTags, setSelectedInstructionsOptions,  setFilteredResults, selecteTags, selectedIngredients, selectedCategory, selectedInstructionsOptions, setSelectedCategory, andOr } = StateContext();

  const skipNo = parseInt(router.query.previews.split('-')[1]) || 0;

  const page = (skipNo + 100) / 100;
  const [currentPage, setCurrentPage] = useState(page);


  function onPageChange(page){
    setCurrentPage(page)
    router.push(`recipes-${page * 100 - 100}-${sortField}-${sortOrder}_${selecteTags.map((item) => item.label).join(',')}_${selectedIngredients.map((item) => item.label).join(',')}_${selectedCategory == '' ? selectedCategory : selectedCategory.value}_${selectedInstructionsOptions}_${andOr}`);
  }

  function handleNextClick() {
    router.push(`recipes-${skipNo + 100}-${sortField}-${sortOrder}_${selecteTags.map((item) => item.label).join(',')}_${selectedIngredients.map((item) => item.label).join(',')}_${selectedCategory == '' ? selectedCategory : selectedCategory.value}_${selectedInstructionsOptions}_${andOr}`);

  }

  const totalPages = Math.ceil(totalRecipes/100)

  useEffect(() => {
    router.push(`recipes-${skipNo}-${sortField}-${sortOrder}_${selecteTags.map((item) => item.label).join(',')}_${selectedIngredients.map((item) => item.label).join(',')}_${selectedCategory == '' ? selectedCategory : selectedCategory.value}_${selectedInstructionsOptions}_${andOr}`);
  }, [sortField, sortOrder, selecteTags, selectedIngredients, selectedCategory, selectedInstructionsOptions]);

  return (
    <main>

      <div className='previewBackgroundImage'>
        <SearchAndFilterHero>
          <SearchBar />
          <div className="previewMain">
            <FilterbyTags />
            <FilterbyIngredients  
              skipNo={skipNo}
              sortField={sortField} 
              sortOrder={sortOrder}
            />
            <FilterbyInstructions />

            <div className="sort-dropdown">
              <label style={{color:'white'}}> Sort by:</label>
              <select
                className='previewSort'
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="id">default</option>
                <option value="prep">Prep time</option>
                <option value="cook">Cook time</option>
                <option value="published">Date</option>
              </select>

              <select
                className='previewSort'
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <h5 style={{color:'white'}}>{totalRecipes}</h5>
            <h6 style={{color:'white'}}>{totalRecipes == 0 ? "No filters have been applied" : ''}</h6>
          </div>
          <WhiteButton
            click={() => {
              setFilteredResults(0)
              setSelectedInstructionsOptions(0)
              setSelectedIngredients([])
              setSelectedTags([])
              setSelectedCategory([])
              setFilteredResults(0)
            }}
            text= 'Clear filters'
          />
        </SearchAndFilterHero>
      </div>

      <PreviewList
        recipes={filteredResults.length > 0 ? filteredResults : recipes}
      />

      <div className="loadMore">
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
        {totalRecipes - skipNo >= 100 ? <div >
          <WhiteButton 
            click={handleNextClick} 
            text={totalRecipes - skipNo - 100+ ' '+ 'remaining'}
          />
        </div>: ''}
      </div>
    </main>
  );
}

export async function getServerSideProps({ params }) {
  try{
    const { previews } = params;
    const skipNo = parseInt(previews.split('-')[1]);
    const sortBy = previews.split('-')[2];
    const sortOrder = previews.split('-')[3].split('_')[0] === 'desc' ? -1 : 1

    const tags = previews.split('_')[1].split(',')
    const ingredients = previews.split('_')[2].split(',')
    const category = previews.split('_')[3]
    const instruction = parseInt(previews.split('_')[4])
    const andOr = previews.split('_')[5] === 'false' ? "$and" : "$or"
    const { recipes, totalRecipes } = await getRecipes(skipNo, 100, { [sortBy == 'id'? '_id' : sortBy]: sortOrder }, tags, ingredients, category, instruction, andOr)

    return {
      props: {
        recipes,
        totalRecipes,
      },
    };
  }catch(error){
    const errorMessage = error.message || 'OOPS!!! Something went wrong.';
    return{
      props: {
        error : errorMessage
      }
    }
  }
}
