'use client';
import PreviewList from '@/component/Recipes/Preview/PreviewList';
import { useState, useEffect, useMemo } from 'react';
import SearchBar from '@/component/filtering/searchCategories/categorySearch';
import { GrChapterNext } from 'react-icons/gr';
import Typography from '@mui/material/Typography';
import SkeletonTypography from '@/component/ui/loadingSkeleton.js/loading';
import StateContext from '@/useContext/StateContext';
import FilterbyTags from '@/component/filtering/filtering/filterbyTags';
import getRecipes from '@/database/getData/getRecipes';
import { useRouter } from 'next/router';
import FilterbyIngredients from '@/component/filtering/filtering/filterbyIngredients';
import SearchAndFilterHero from '@/component/filtering/searchAndFilterHero/searchAndFilterHero';
import { BlueButton, WhiteButton } from '@/component/Button/button';
import { Pagination } from 'flowbite-react';
import FilterbyInstructions from '@/component/filtering/filtering/filterbyInstructions';
import { Spinner } from 'flowbite-react';
import ErrorMessage from '@/component/Error/ErrorMessage';

export default function AllRecipes({ Data, url, totalRecipes, error }) {

  if(error){
    console.log('missing env file')
    return (
      <div style={{ textAlign: 'center', marginTop:'100px'}}>
        <Spinner />
        <ErrorMessage message={'.env file is missing or has no values'}/>
      </div>
    )
  }

  const router = useRouter();
  // const [results, setResults] = useState(null);
  const [sortField, setSortField] = useState('_id'); // Default sort field
  const [sortOrder, setSortOrder] = useState(''); // Default sort order
  const { filteredResults, total, setSelectedIngredientsOptions, setSelectedTagsOptions,setSelectedInstructionsOptions,  setFilteredResults } = StateContext();

  const skipNo = parseInt(router.query.previews.split('-')[1]);

  const page = (skipNo + 100) / 100;
  const [currentPage, setCurrentPage] = useState(page);


  function onPageChange(page){
    setCurrentPage(page)
    console.log(page * 100 - 100)
    router.push(`recipes-${page * 100 - 100}-${sortField}-${sortOrder}`);
  }

  function handleNextClick() {
    router.push(`recipes-${skipNo + 100}-${sortField}-${sortOrder}`);
  }

  const totalPages = Math.ceil(totalRecipes/100)

  useEffect(() => {
    router.push(`recipes-${skipNo}-${sortField}-${sortOrder}`);
  }, [sortField, sortOrder]);

  return (
    <div>
      <Typography variant="circular">
        {Data ? (
          <main>
            <SearchAndFilterHero>
              <SearchBar />
              <div className="previewMain">
                <FilterbyTags />
                <FilterbyIngredients />
                <FilterbyInstructions />

                <div className="sort-dropdown">
                  <label> Sort by:</label>
                  <select
                    className='previewSort'
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                  >
                    <option value="_id">default</option>
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

                <h5>{total}</h5>
                <h6>{total == 0 ? "No filters have been applied" : ''}</h6>
              </div>
              <WhiteButton
                click={() => {
                  setFilteredResults(0)
                  setSelectedInstructionsOptions([])
                  setSelectedIngredientsOptions([])
                  setSelectedTagsOptions([])
                  setFilteredResults(0)
                }}
                text= 'Clear filters'
              />
            </SearchAndFilterHero>
            <PreviewList
              recipes={filteredResults.length > 0 ? filteredResults : Data}
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
        ) : (
          <div className="recipesLoading">
            <SkeletonTypography />
          </div>
        )}
      </Typography>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try{
    const { previews } = params;
    const skipNo = parseInt(previews.split('-')[1]);
    const sortBy = previews.split('-')[2];
    const sortOrder = previews.split('-')[3] === 'desc' ? -1 : 1
    const data = await getRecipes({}, skipNo, 100, { [sortBy]: sortOrder });
    const Data = data.recipes;
    const totalRecipes = data.totalRecipes;
  
    const url = [skipNo, sortBy];
    return {
      props: {
        Data,
        url,
        totalRecipes,
      },
    };
  }catch(error){
    return{
      props: {
        error : 'error'
      }
    }
  }
}
