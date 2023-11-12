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
import FilterbyInstructions from '@/component/filtering/filtering/filterbyInstructions';
import { BlueButton } from '@/component/Button/button';

export default function AllRecipes({ Data, url, totalRecipes }) {
  const router = useRouter();
  // const [results, setResults] = useState(null);
  const [sortField, setSortField] = useState('_id'); // Default sort field
  const [sortOrder, setSortOrder] = useState(''); // Default sort order
  const { filteredResults, total, setSelectedIngredientsOptions, setSelectedTagsOptions,setSelectedInstructionsOptions,  setFilteredResults } = StateContext();

  const skipNo = parseInt(router.query.previews.split('-')[1]);

  const page = (skipNo + 100) / 100;

  function handleNextClick() {
    router.push(`recipes-${skipNo + 100}-${sortField}-${sortOrder}`);
  }

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
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                  >
                    <option value="_id">default</option>
                    <option value="prep">Prep time</option>
                    <option value="cook">Cook time</option>
                    <option value="published">Date</option>
                  </select>

                  <select
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
              <BlueButton
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
              <div className="pNumber">
                {' '}
                <h2 className='loadMoreButton'>{page}</h2>
              </div>
    
              {totalRecipes - skipNo >= 100?<div >
                <button  className='loadMoreButton' onClick={handleNextClick} disabled={false}>
                  {' '}
                   {totalRecipes - skipNo - 100} {' '} remaining
                </button>
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
  const { previews } = params;
  const skipNo = parseInt(previews.split('-')[1]);
  const sortBy = previews.split('-')[2];
  const sortOrder = previews.split('-')[3] === 'asc' ? 1 : -1;
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
}
