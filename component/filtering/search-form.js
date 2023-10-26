import { useRef, useState } from "react";
import PreviewList from "../Recipes/Preview/PreviewList";

export default function SearchForm() {
  const searchRef = useRef();
  const timeoutRef = useRef(null); 
  const [ results, setResults ] = useState(null)

  const searchHandler = () => {
    const filterInput = searchRef.current.value;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    /**
     * fetches results from the api folder.
     * insert in inside a state, state is then mapped over to display results.
     * 
     * {@link timeoutRef} set the delay to only display results after stopping to text
     */
    timeoutRef.current = setTimeout(() => {
      fetch(`/api/filtering/search?title=${filterInput}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data && data.results)
        });
    }, 620); 
  };

  return (
    <div>
      <h1>Find recipes</h1>
      <input
        type="text"
        placeholder="Search for data"
        onChange={searchHandler}
        ref={searchRef}
      />
      {/* maps over results state and map over it */}
      <PreviewList recipes={results} input={results && searchRef.current.value} />
   
    </div>
  );
}
