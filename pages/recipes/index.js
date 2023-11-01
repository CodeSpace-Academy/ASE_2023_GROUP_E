import PreviewList from '@/component/Recipes/Preview/PreviewList';
import { useState, useEffect } from 'react';
import SearchBar from '@/component/filtering/searchCategories/categorySearch';
import { GrChapterNext } from 'react-icons/gr';
import LoadingSpinner from '@/component/ui/loadingSpinner/LoadingSpinner';

export default function AllRecipes() {
  const [results, setResults] = useState(null);
  const [sortField, setSortField] = useState('_id'); // Default sort field
  const [sortOrder, setSortOrder] = useState(''); // Default sort order
  let addSkip;

  useEffect(() => {
    // eslint-disable-next-line radix
    const skipNo = parseInt(localStorage.getItem('skipNo'));
    addSkip = skipNo;

    fetch(
      `/api/recipes/preview?skip=${skipNo && skipNo}&limit=${50}&sort=${sortField}&sortIn=${sortOrder === 'asc' ? 1 : -1}`,
    )
      .then((res) => res.json())
      .then((data) => setResults(data.recipes));
  }, [sortField, sortOrder]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }
  return results ? (
    <main className='previewMain'>
      <SearchBar />
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
    

      <GrChapterNext
        color="light gray"
        fontSize="24px"
        onClick={() => {
          localStorage.setItem('skipNo', addSkip + 50);
          scrollToTop();
        }}
        disabled={false}
      />

      {/* <button>Page: {pageNumber}</button> */}
      <PreviewList recipes={results} /*  click={loadMoreRecipes}  */
     />
    </main>
  ) : (
    <LoadingSpinner />
  );
}
