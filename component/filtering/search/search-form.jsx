/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, {
  Fragment, useEffect, useRef, useState,
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'lodash';
import PreviewList from '../../Recipes/Preview/PreviewList';
import classes from './search-from.module.css';

export default function SearchForm() {
  const searchRef = useRef();
  const [results, setResults] = useState(null);
  const [searchHistory, setSearchHistory] = useState(null);
  const [displayHistory, setDisplayHistory] = useState(false);
  const [addSearchHistory, setAddSearchHistory] = useState(false);

  /**
   * fetch a specific user's history
   */
  useEffect(() => {
    fetch('/api/filtering/search/searchHistory?username=mike')
      .then((res) => { return res.json(); })
      .then((data) => setSearchHistory(data.searchhistory[0] ? [...new Set(data.searchhistory[0].input)] : []))
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
      await addItem('/api/filtering/search/searchHistory', { username: 'mike', searchHistoryInput: results && searchRef.current.value });
    } catch (error) {
      // console.log(error);
    }
  }

  const debouncedSearchHistoryHandler = debounce(searchHistoryHandler, 2000);

  if (addSearchHistory && results && searchRef.current.value.length > 1) {
    setAddSearchHistory(false);
    debouncedSearchHistoryHandler();
  }

  /**
   * 
   * @param {string} item - is the value from the history list.
   * when the history item is clicked it fires the following function.
   * which then triggers the search function
   */
  const historyItemClickHandler = (item) => {
    const selectedValue = item;
    searchRef.current.value = selectedValue;
    searchHandler(selectedValue);
  };

  return (
    <>
      <div className={classes.search}>
        <h1>Find recipes</h1>
        <input
          type="text"
          placeholder="Search for recipes"
          onChange={debouncedSearchHandler}
          ref={searchRef}
          // when search bar is clicked history appears
          onClick={() => setDisplayHistory(true)}
        />

        {/**
         * waits for input to be clicked then history pops up
         * maps over the history of the specific user
         *  */}
        {displayHistory
          && <div className={classes.searhHistory}>
              {
                searchHistory && searchHistory.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        console.log(index);
                        setDisplayHistory(false)
                        historyItemClickHandler(item);
                      }}
                    >
                      {item}
                    </li>
                  );
                })
              }
            </div>
        }
      </div>

      <div className={classes.results} onClick={() => { setDisplayHistory(false); }}>
        {checkResults
          ? <PreviewList recipes={results} input={results && searchRef.current.value} />
          : <p>No Matching Recipes</p>}
      </div>
    </>
  );
}

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

