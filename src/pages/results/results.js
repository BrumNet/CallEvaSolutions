import { Nav } from "../common/header";
import { SearchBox } from "../common/search";
import { AppAdd } from "../common/appadd";
import { Footer } from "../common/footer";
import { Result } from "./components/results";
import { useState } from "react";
import { ServicePage } from "./components/landingpage";

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
      {search?
      <>
      <SearchBox setData={setState}/>
      <Result landingpage={setState} data={resultsData}/>
      <AppAdd/>
      </>:
      <ServicePage landingpage={setState} data ={data}/>}
      <Footer/>
    </div>
}

export default Results;