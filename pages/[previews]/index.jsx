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
import { getRecipes } from '@/database/getData/getRecipesData';
import { parseInt } from 'lodash';
import SearchForm from '@/component/filtering/search/search-form';

export default function AllRecipes({
  error,
  recipes,
  totalRecipes,
  instruction,
}) {
  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <Spinner />
        <ErrorMessage message={error} />
      </div>
    );
  }

  const router = useRouter();
  const [sortField, setSortField] = useState('id'); // Default sort field
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order
  const [instructionsErrorMessage, setInstructionsErrorMessage] =
    useState(false);
  const {
    searchText,
    searchInput,
    setSelectedIngredients,
    setSelectedTags,
    setSelectedInstructionsOptions,
    selecteTags,
    selectedIngredients,
    selectedCategory,
    selectedInstructionsOptions,
    setSelectedCategory,
    andOr,
  } = StateContext();

  /**
   * When filtering recipes, then decides to share the url, the shared link will display the filterd recipes
   */
  useEffect(() => {
    setSelectedCategory({ value: window.location.href.split('_')[3] });
  }, []);
  useEffect(() => {
    if (instruction > 0 && totalRecipes === 0) {
      console.log('We have no recipes returned');
      setInstructionsErrorMessage(true);
    } else {
      setInstructionsErrorMessage(false);
      console.log('totalRecipes', totalRecipes, 'instruction', instruction);
    }
  }, [totalRecipes]);

  const skipNo = parseInt(router.query.previews.split('-')[1]) || 0;

  const page = (skipNo + 100) / 100;
  const [currentPage, setCurrentPage] = useState(page);

  function path(skip) {
    const path = `recipes-${skip}-${sortField}-${sortOrder}_${selecteTags
      .map((item) => item.label)
      .join(',')}_${selectedIngredients.map((item) => item.label).join(',')}_${
      selectedCategory == '' ? selectedCategory : selectedCategory.value
    }_${selectedInstructionsOptions}_${andOr}_${searchText}`;
    return path;
  }

  function onPageChange(page) {
    setCurrentPage(page);
    router.push(path(page * 100 - 100));
  }

  function handleNextClick() {
    router.push(path(skipNo + 100));
  }

  const totalPages = Math.ceil(totalRecipes / 100);

  useEffect(() => {
    router.push(path(skipNo));
  }, [
    sortField,
    sortOrder,
    selecteTags,
    selectedIngredients,
    selectedCategory,
    selectedInstructionsOptions,
    searchText,
  ]);

  return (
    <main>
      <div className="previewBackgroundImage">
        <div className="allRecipesTitle">
          <h1 className="allRecipes">All Recipes</h1>
        </div>

        <div className="searchAndFilters">
          <div>
            <SearchForm />
          </div>

          <div>
            <SearchAndFilterHero>
              <SearchBar />
              <div className="previewMain">
                <FilterbyTags />
                <FilterbyIngredients
                  skipNo={skipNo}
                  sortField={sortField}
                  sortOrder={sortOrder}
                />
                /
                {instructionsErrorMessage && (
                  <p>No results with {instruction} amount of instructions</p>
                )}
                <FilterbyInstructions />
                <div className="sort-dropdown">
                  <label style={{ color: 'white' }}> Sort by:</label>
                  <select
                    className="previewSort"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                  >
                    <option value="id">default</option>
                    <option value="prep">Prep time</option>
                    <option value="cook">Cook time</option>
                    <option value="published">Date</option>
                  </select>

                  <select
                    className="previewSort"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
              <WhiteButton
                click={() => {
                  setSelectedInstructionsOptions(0);
                  setSelectedIngredients([]);
                  setSelectedTags([]);
                  setSelectedCategory([]);
                  router.query.previews.substring(0, 20) ===
                  'recipes-0-id-asc____'
                    ? alert('No filters have been applied')
                    : '';
                }}
                text="Clear filters"
              />
            </SearchAndFilterHero>
          </div>
        </div>
      </div>

      {totalRecipes === 0 || totalRecipes === 164959 ? (
        ''
      ) : (
        <div className="totalRecipes">
          <h3>{totalRecipes} results</h3>
        </div>
      )}

      <PreviewList input={searchInput} recipes={recipes} />

      <div className="loadMore">
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
        {totalRecipes - skipNo >= 100 ? (
          <div>
            <h6> {totalRecipes - skipNo - 100 + ' ' + 'remaining'}</h6>
          </div>
        ) : (
          ''
        )}
      </div>
    </main>
  );
}

export async function getServerSideProps({ params }) {
  try {
    /**
     * fetches data from the url
     * which is the use to filter or sort recipes
     */
    const { previews } = params;
    const skipNo = parseInt(previews.split('-')[1]);
    const sortBy = previews.split('-')[2];
    const sortOrder = previews.split('-')[3].split('_')[0] === 'desc' ? -1 : 1;
    const searchInput = previews.split('_')[6];
    const tags = previews.split('_')[1].split(',');
    const ingredients = previews.split('_')[2].split(',');
    const category = previews.split('_')[3];
    const instruction = parseInt(previews.split('_')[4]);
    const andOr = previews.split('_')[5] === 'false' ? '$and' : '$or';
    const { recipes, totalRecipes } = await getRecipes(
      'recipes',
      skipNo,
      100,
      { [sortBy == 'id' ? 'createdAt' : sortBy]: sortOrder },
      tags,
      ingredients,
      category,
      instruction,
      andOr,
      '',
      '',
      '',
      searchInput,
    );

    return {
      props: {
        recipes,
        totalRecipes,
        instruction,
      },
    };
  } catch (error) {
    const errorMessage = error.message || 'OOPS!!! Something went wrong.';
    return {
      props: {
        error: errorMessage,
      },
    };
  }
}
