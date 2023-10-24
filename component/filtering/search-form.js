import { useRef, useState } from "react";


export default function SearchForm({data}){

    const searchRef = useRef()
  
    const searchHandler = (e) => {
      const filterInput = searchRef.current.value.toLowerCase();
  
      const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(filterInput)
      );
  
      setResults(filteredData);
    };

    return(
        <div>
            <h1>Search Bar in React</h1>
                <input
                    type="text"
                    placeholder="Search for recipe"
                    onChange={searchHandler}
                    ref={searchRef}
                />
          
        </div>
    )
}