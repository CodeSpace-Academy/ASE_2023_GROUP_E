import React, { Fragment, useRef, useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'lodash';
import classes from './search-from.module.css';
import StateContext from '@/useContext/StateContext';


export default function SearchForm() {
  const searchRef = useRef();
  // const [results, setResults] = useState(null);
  // const {setFilteredResults, setSearchInput, total, setTotal} = StateContext(null)
  const {searchText, setSearchText, setSearchInput} = StateContext(null)
  const [searchHistory, setSearchHistory] = useState(null);
  const [displayHistory, setDisplayHistory] = useState(false);
  // const [length, setLength] = useState(0)
  const [addSearchHistory, setAddSearchHistory] = useState(false);
  // const [errorhandler, setErrorHandler] = useState(null)

  const searchHandler = () => {
    const filterInput = searchRef.current.value;

    setSearchText(filterInput)
    setAddSearchHistory(true);

    /**
     * fetches results from the api folder.
     * insert in inside a state, state is then mapped over to display results.
     */
    // fetch(`/api/filtering/search/search?title=${filterInput}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if(data.message){
    //       setErrorHandler(data.message)
    //     }else{
    //       setFilteredResults(data.results && data.results[0] || [])
    //       setResults(data.results && data.results[0] || []);
    //       setTotal(total + data.results && data.results[1] || 0);
    //       setAddSearchHistory(true);
    //     }

    //   });


  };

  const debouncedSearchHandler = debounce(searchHandler, 1300);

  // const checkResults = results && results.length !== 0;

  async function searchHistoryHandler() {
    try {
      setAddSearchHistory(false);
      await addItem('/api/filtering/search/searchHistory', { username: 'mike', searchHistoryInput: searchText && searchRef.current.value });
    } catch (error) {
    }
  }

  const debouncedSearchHistoryHandler = debounce(searchHistoryHandler, 2000);

  if (addSearchHistory && searchRef.current.value.length > 1) {
    setAddSearchHistory(false);
    debouncedSearchHistoryHandler();
  }

  /**
   * fetch a specific user's history
   */
    useEffect(() => {
      fetch('/api/filtering/search/searchHistory?username=mike')
        .then((res) => { return res.json(); })
        .then((data) => {
          if(data.searchhistory){
            setSearchHistory(data.searchhistory[0] ? [...new Set(data.searchhistory[0].input)] : [])
          }
        })
    }, [setSearchHistory]);

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
  setSearchInput(searchText && searchRef.current.value)
  return (
    <>
      <div className={classes.search}>
       
        <input
          type="text"
          placeholder="Search for recipes"
          onChange={debouncedSearchHandler}
          ref={searchRef}
          onClick={() => setDisplayHistory(true)}
        />

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
