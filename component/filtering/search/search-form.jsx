import React, { useRef, useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'lodash';
import { IoCloseCircleSharp } from 'react-icons/io5';
// eslint-disable-next-line import/no-unresolved
import classes from './search-from.module.css';
// eslint-disable-next-line import/no-unresolved
import StateContext from '../../../useContext/StateContext';
import { WhiteButton } from '../../Button/button';
import { Spinner } from 'flowbite-react';

/**
 * @returns {jsx} an input with a list of previous search texts
 */
export default function SearchForm() {
  const searchRef = useRef();
  const { searchText, setSearchText, setSearchInput } = StateContext(null);
  const [searchHistory, setSearchHistory] = useState(null);
  const [displayHistory, setDisplayHistory] = useState(false);
  const [addSearchHistory, setAddSearchHistory] = useState(false);
  const [longQueryButton, SetLongQueryButton] = useState(false);
  const [searchSpinner, setSearchSpinner] = useState(false);

  const searchHandler = () => {
    const filterInput = searchRef.current.value;
    if (filterInput.split('').length < 13) {
      setSearchText(filterInput);
      setAddSearchHistory(true);
      SetLongQueryButton(false);
      setDisplayHistory(false);
      setSearchSpinner(false)
    } else if (filterInput.split('').length > 12) {
      SetLongQueryButton(true);
      setDisplayHistory(false);
      setSearchSpinner(false);
    }
  };

  const debouncedSearchHandler = debounce(searchHandler, 2350);

  async function searchHistoryHandler() {

    const searchTextTrim = searchText.trim()

    if (searchText.replace(/\s/g, '').length > 0) {
      try {
        setAddSearchHistory(false);
        await addItem('/api/filtering/search/searchHistory', { username: 'mike', searchHistoryInput: searchText && searchRef.current.value });
      } catch (error) {
        console.log('failed attempt');
      }
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
  function loadHistory() {
    fetch('/api/filtering/search/searchHistory?username=mike')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.searchhistory) {
          setSearchHistory(
            data.searchhistory[0]
              ? // reveresed the array so that the latest results appear first
                [...new Set(data.searchhistory[0].input)].reverse()
              : [],
          );
        }
      });
  }

  /**
   *
   * @param {string} item - is the value from the history list.
   * when the history item is clicked it fires the following function.
   * which then triggers the search function
   */
  function historyItemClickHandler(item) {
    const selectedValue = item;
    searchRef.current.value = selectedValue;
    searchHandler(selectedValue);
  }

  
  /**
   * console was arguing that "state cant be updated"
   * setting state inside the useffect is the solution
   */
  useEffect(() => {
    setSearchInput(searchText && searchRef.current.value);
  })

  return (
    <div className={classes.search}>
      <input
        type="text"
        placeholder="Search for recipes"
        onChange={debouncedSearchHandler}
        ref={searchRef}
        onClick={() => {
          setDisplayHistory(true);
          loadHistory();
          setSearchSpinner(true)
        }}
      />
      {searchSpinner ? <Spinner/> : ''}

      {longQueryButton ? (
        <WhiteButton
          text="Submit"
          click={() => {
            setSearchText(searchRef.current.value);
          }}
        />
      ) : (
        ''
      )}

      {/**
       * waits for input to be clicked then history pops up
       * maps over the history of the specific user
       *  */}
      {displayHistory && (
        <div className={classes.searhHistory}>
          <div className={classes.close}>
            <button style={{cursor:'pointer'}}>
              <IoCloseCircleSharp
                size={25}
                onClick={() => {
                  return setDisplayHistory(false);
                }}
              />
            </button>
          </div>
          {searchHistory &&
            searchHistory.map((item, index) => {
              return (
                // eslint-disable-next-line max-len
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  onClick={() => {
                    setDisplayHistory(false);
                    historyItemClickHandler(item);
                  }}
                >
                  {item}
                </li>
              );
            })}
        </div>
      )}
    </div>
  );
}

/**
 * Asynchronously adds an item to a specified API endpoint using a POST request.
 *
 * @param {string} apiPath - The URL or path of the API endpoint where the
 * item will be added. eg('/api/filename')
 * @param {Object} item - The item to be added to the API. Should be a
 * JavaScript object.eg({key: value})
 * @returns {Promise<Object>} A promise that resolves to the response data from the API.
 * @throws {Error} If the POST request fails or the response status is not OK,
 * an error is thrown with a message.
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
