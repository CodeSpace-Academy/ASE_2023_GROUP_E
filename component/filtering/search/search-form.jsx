import { useRef, useState } from 'react';
import { debounce } from 'lodash';
import PreviewList from '../../Recipes/Preview/PreviewList';
import { addItem } from '../../../database/addToDatabase';

export default function SearchForm() {
  const searchRef = useRef();
  const [results, setResults] = useState(null);
  const [addSearchHistory, setAddSearchHistory] = useState(false);

  const searchHandler = () => {
    const filterInput = searchRef.current.value;
    /**
     * fetches results from the api folder.
     * insert in inside a state, state is then mapped over to display results.
     */
    fetch(`/api/filtering/search/search?title=${filterInput}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data && data.results);
        setAddSearchHistory(true);
      });
  };
  const debouncedSearchHandler = debounce(searchHandler, 1000);

  const checkResults = results && results.length !== 0;

  async function searchHistoryHandler() {
    try {
      setAddSearchHistory(false);
      await addItem('/api/filtering/search/searchHistory', { username: 'bob', searchHistoryInput: results && searchRef.current.value });
    } catch (error) {
      console.log(error);
    }
  }

  const debouncedSearchHistoryHandler = debounce(searchHistoryHandler, 2000);

  if (addSearchHistory && results && searchRef.current.value.length > 1) {
    setAddSearchHistory(false);
    debouncedSearchHistoryHandler();
  }

  return (
    <div>
      <h1>Find recipes</h1>
      <input
        type="text"
        placeholder="Search for data"
        onChange={debouncedSearchHandler}
        ref={searchRef}
      />
      {/* maps over results state and map over it */}
      {checkResults
        ? <PreviewList recipes={results} input={results && searchRef.current.value} />
        : <p>No Matching Recipes</p>}

    </div>
  );
}
