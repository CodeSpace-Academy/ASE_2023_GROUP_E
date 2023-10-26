import SearchForm from "@/component/filtering/search-form";


export default function Search(){

  const dummyData = [
    { id: 1, title: 'John Doe',    cook: 30 },
    { id: 2, title: 'Jane Smith',  cook: 25 },
    { id: 3, title: 'Bob Johnson', cook: 35 },
    { id: 4, title: 'Alice Brown', cook: 28 },
    { id: 5, title: 'Eva Davis',   cook: 32 },
  ];


  return(
    <SearchForm searchResults={dummyData} />
  )
}

