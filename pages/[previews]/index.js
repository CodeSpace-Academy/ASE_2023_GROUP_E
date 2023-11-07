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


export default function AllRecipes({ Data, url }) {
  const router = useRouter()
  // const [results, setResults] = useState(null);
  const [sortField, setSortField] = useState('_id'); // Default sort field
  const [sortOrder, setSortOrder] = useState(''); // Default sort order
  const { filteredResults } = StateContext()

  const skipNo = parseInt(router.query.previews.split('-')[1])

  function handleNextClick() {
    router.push(`recipes-${skipNo + 100}-${sortField}-${sortOrder}`)
  }

  useEffect(() => {
    router.push(`recipes-${skipNo}-${sortField}-${sortOrder}`)
  }, [sortField, sortOrder])

  return (
    <div className="previewMain">

      <Typography variant="circular">
        {Data ? <main>
          <SearchBar />
          <FilterbyTags />
          <FilterbyIngredients />

          <div className="sort-dropdown">
            <label> Sort by:</label>
            <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
              <option value="_id">default</option>
              <option value="prep">Prep time</option>
              <option value="cook">Cook time</option>
              <option value="published">Date</option>
            </select>

            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <PreviewList recipes={filteredResults.length > 0 ? filteredResults : Data} />

          <GrChapterNext
            color="light gray"
            fontSize="24px"
            onClick={handleNextClick}
            disabled={false}
          />
        </main> :

          <div className='recipesLoading'>
            <SkeletonTypography />
          </div>
        }
      </Typography>
    </div>
  )
}


export async function getServerSideProps({ params }) {

  const { previews } = params
  const skipNo = parseInt(previews.split('-')[1])
  const sortBy = previews.split('-')[2]
  const sortOrder = previews.split('-')[3] === 'asc' ? 1 : -1
  const data = await getRecipes({}, skipNo, 100, { [sortBy]: sortOrder })
  const Data = data.recipes


  const url = [skipNo, sortBy]
  return {
    props: {
      Data,
      url
    }
  }
}



