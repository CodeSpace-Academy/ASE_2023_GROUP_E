import React, { Fragment, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'lodash';
import PreviewList from '../../Recipes/Preview/PreviewList';
import classes from './search-from.module.css';

export default function SearchForm() {
  const searchRef = useRef();
  const [results, setResults] = useState(null);
  const [length, setLength] = useState(0)
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
        setResults(data && data.results[0]);
        setLength(data && data.results[1])
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
      // console.log(error);
    }
  }

  const debouncedSearchHistoryHandler = debounce(searchHistoryHandler, 2000);

  if (addSearchHistory && results && searchRef.current.value.length > 1) {
    setAddSearchHistory(false);
    debouncedSearchHistoryHandler();
  }

  return (
    <>
          <div className={classes.search}>
        <h1>Find recipes</h1>
        <input
          type="text"
          placeholder="Search for recipes"
          onChange={debouncedSearchHandler}
          ref={searchRef}
        />
        {/* maps over results state and map over it */}

      </div>
      <h4>Total Recipes Searched: {length}</h4>
      <div className={classes.results}>
        {checkResults
          ? <PreviewList recipes={results} input={results && searchRef.current.value} />
          : <p>No Matching Recipes</p>}
      </div>
    </>
  );
}


/**
 * Asynchronously adds an item to a specified API endpoint using a POST request.
 *
 * @param {string} apiPath - The URL or path of the API endpoint where the item will be added. eg('/api/filename')
 * @param {Object} item - The item to be added to the API. Should be a JavaScript object.eg({key: value})
 * @returns {Promise<Object>} A promise that resolves to the response data from the API.
 * @throws {Error} If the POST request fails or the response status is not OK, an error is thrown with a message.
 */
async function addItem(apiPath, item) {
  const response = await fetch(apiPath, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
  return data;
}
