import PreviewList from '@/component/Recipes/Preview/PreviewList';
import { useState, useEffect } from 'react';
import SearchBar from '@/component/filtering/searchCategories/categorySearch';
import { GrChapterNext } from 'react-icons/gr';
import LoadingSpinner from '@/component/ui/loadingSpinner/LoadingSpinner';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import SkeletonTypography from '@/component/ui/loadingSkeleton.js/loading';
import StateContext from '@/useContext/StateContext';
import MultiSelectForm from '@/component/filtering/filtering/filterForm';

export default function AllRecipes() {
  const [results, setResults] = useState(null);
  const [sortField, setSortField] = useState('_id'); // Default sort field
  const [sortOrder, setSortOrder] = useState(''); // Default sort order
  const { addSkip, setAddSkip } = StateContext()

  useEffect(() => {
    // eslint-disable-next-line radix
    const skipNo = parseInt(localStorage.getItem('skipNo'));
    setAddSkip(skipNo);

    fetch(
      `/api/recipes/preview?skip=${skipNo && skipNo}&limit=${50}&sort=${sortField}&sortIn=${sortOrder === 'asc' ? 1 : -1}`,
    )
      .then((res) => res.json())
      .then((data) => setResults(data.recipes));
  }, [sortField, sortOrder, addSkip]);

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

  return  (

    <Typography variant="circular"> {results ?
    <main>
      <SearchBar />
      <MultiSelectForm/>

      <div  className="previewMain">

      <div className="sort-dropdown">
        <label> Sort by:</label>
        <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
          <option value=""> </option>
          <option value="prep">Prep time</option>
          <option value="cook">Cook time</option>
          <option value="published">Date</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
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

    </main>:  <div className='recipesLoading'>
    <SkeletonTypography />
    </div> } </Typography>
 
  );
}

 

