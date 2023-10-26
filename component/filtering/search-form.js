import { useEffect, useRef, useState } from "react";




export default function SearchForm(){


    const searchRef = useRef()
    useEffect(() =>{
      const filterInput = searchRef.current.value.toLowerCase();
      fetch(`/api/filtering/search?title=${filterInput}`)
        .then(res => res.json())
        .then(data => console.log(data.results))
    })

    return(
        <div>
            <h1>Search Bar in React</h1>
                <input
                    type="text"
                    placeholder="Search for data"
                    onChange={searchHandler}
                    ref={searchRef}
                />
        </div>
    )
}
