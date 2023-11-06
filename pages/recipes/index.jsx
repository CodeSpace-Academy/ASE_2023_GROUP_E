import { useState, useEffect } from 'react';
import { GrChapterNext } from 'react-icons/gr';
import Typography from '@mui/material/Typography';
import PreviewList from '../../component/Recipes/Preview/PreviewList';
import SearchBar from '../../component/filtering/searchCategories/categorySearch';
import SkeletonTypography from '../../component/ui/loadingSkeleton.js/loading';
import StateContext from '../../useContext/StateContext';

export default function AllRecipes() {
  const [results, setResults] = useState(null);
  const [sortField, setSortField] = useState('_id'); // Default sort field
  const [sortOrder, setSortOrder] = useState(''); // Default sort order
  const { addSkip, setAddSkip } = StateContext();

  useEffect(() => {
    // eslint-disable-next-line radix
    const skipNo = parseInt(localStorage.getItem('skipNo'));
    setAddSkip(skipNo);

    fetch(
      `/api/recipes/preview?skip=${
        skipNo && skipNo
      }&limit=${50}&sort=${sortField}&sortIn=${sortOrder === 'asc' ? 1 : -1}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return setResults(data.recipes);
      });
  }, [sortField, sortOrder, addSkip, setAddSkip]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }

  function handleNextClick() {
    const newSkip = addSkip + 50;
    localStorage.setItem('skipNo', newSkip);
    setAddSkip(newSkip);
    scrollToTop();
  }

  return (
    <Typography variant="circular">
      {' '}
      {results ? (
        <main>
          <SearchBar />

          <div className="previewMain">
            <div className="sort-dropdown">
              <label htmlFor="filteringOption"> Sort by:</label>
              <select
                value={sortField}
                onChange={(e) => {
                  return setSortField(e.target.value);
                }}
                id="filteringOption"
              >
                <option value=""> </option>
                <option value="prep">Prep time</option>
                <option value="cook">Cook time</option>
                <option value="published">Date</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => {
                  return setSortOrder(e.target.value);
                }}
              >
                <option value=""> </option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          <PreviewList recipes={results} />

          <GrChapterNext
            color="light gray"
            fontSize="24px"
            onClick={handleNextClick}
            disabled={false}
          />
        </main>
      ) : (
        <div className="recipesLoading">
          <SkeletonTypography />
        </div>
      )}
    </Typography>
  );
}
