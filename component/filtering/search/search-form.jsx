import React, { Fragment, useRef, useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'lodash';
import PreviewList from '../../Recipes/Preview/PreviewList';
import classes from './search-from.module.css';

export default function SearchForm() {
  const searchRef = useRef();
  const [results, setResults] = useState(null);
  const [searchHistory, setSearchHistory] = useState(null);
  const [displayHistory, setDisplayHistory] = useState(false);
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
  const debouncedSearchHandler = debounce(searchHandler, 1300);

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
   * fetch a specific user's history
   */
    useEffect(() => {
      fetch('/api/filtering/search/searchHistory?username=mike')
        .then((res) => { return res.json(); })
        .then((data) => setSearchHistory(data.searchhistory[0] ? [...new Set(data.searchhistory[0].input)] : []))
    }, []);

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
          onClick={() => setDisplayHistory(true)}
        />
        {/* maps over results state and map over it */}

        
        {/**
         * waits for input to be clicked then history pops up
         * maps over the history of the specific user
         *  */}
        {displayHistory
          && <div className={classes.searhHistory}>
            <p onClick={() => setDisplayHistory(false)}>close</p>
              {
                searchHistory && searchHistory.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
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
      <h4>Total Recipes Searched: {length}</h4>
      <div className={classes.results} onClick={() => { setDisplayHistory(false)}} >
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
