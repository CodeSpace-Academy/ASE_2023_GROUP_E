/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, {
  Fragment, useEffect, useRef, useState,
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'lodash';
import PreviewList from '../../Recipes/Preview/PreviewList';
import classes from './search-from.module.css';

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

export default function SearchForm() {
  const searchRef = useRef();
  const [results, setResults] = useState(null);
  const [searchHistory, setSearchHistory] = useState(null);
  const [filterSearchHistory, setFilterSearchHistory] = useState(null);
  const [addSearchHistory, setAddSearchHistory] = useState(false);

  /**
   * fetch a specific user's history
   */
  useEffect(() => {
    fetch('/api/filtering/search/searchHistory?username=bobA')
      .then((res) => { return res.json(); })
      .then((data) => setSearchHistory(data.searchhistory && data.searchhistory[0].input))
  }, []);

  const searchHandler = () => {
    const filterInput = searchRef.current.value;
    /**
     * fetches results from the api folder.
     * insert in inside a state, state is then mapped over to display results.
     */
    fetch(`/api/filtering/search/search?title=${filterInput}`)
      .then((res) => { return res.json(); })
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

        {/**
         * maps over the history of the specific user
         *  */}
        <div className={classes.searhHistory}>
          {
            searchHistory && searchHistory.map((item, index) => {
              return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  onClick={() => {
                    console.log(index);
                    setFilterSearchHistory(item);
                    // eslint-disable-next-line no-unused-expressions
                    searchHandler;
                  }}
                >
                  {item}
                </li>
              );
            })
          }
        </div>
        {/* maps over results state and map over it */}
      </div>

      <div className={classes.results}>
        {checkResults
          ? <PreviewList recipes={results} input={results && searchRef.current.value} />
          : <p>No Matching Recipes</p>}
      </div>
    </>
  );
}
