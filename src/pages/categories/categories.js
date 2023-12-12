import { Nav } from "../common/header";
import { SearchBox } from "../common/search"; 
import { Footer } from "../common/footer";

import { Category } from "./components/category";
import { useState } from "react"; 

 const Results = () => {
  const [search, setsearch] = useState(true)
  const [resultsData, setResultsData] = useState("")
  const [data, setData] = useState({})
  const getSuggestedQuery = (query) => {
    setResultsData(query)
  }
  const setState = (data) => {
    if(!data) return setsearch(true);
    setsearch(false);
    setData(data);
  }


   return <div>
      <Nav setQuery={getSuggestedQuery} />
      <SearchBox setData={setState}/>
      <center><h3>Categories</h3></center>
      <Category/>
      <br/><br/>
      <Footer/>
    </div>
}

export default Results;