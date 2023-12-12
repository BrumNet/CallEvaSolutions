//Add the 4 imports
import { Nav } from "../common/header";
import { SearchBox } from "../common/search";

import { AppAdd } from "../common/appadd";
import { Footer } from "../common/footer";

//Add Components
import { Result } from "./components/results";
import { ServicePage } from "./components/landingpage";

import { useState } from "react";


 const Results = () => {

  const [search, setsearch] = useState(true), [resultsData, setResultsData] = useState(""), [data, setData] = useState({})
  const getSuggestedQuery = (query) => {setResultsData(query)}

  const setState = (data) => {
    if(!data) return setsearch(true);
    setsearch(false); setData(data);
  }


   return <div>
            <Nav setQuery={getSuggestedQuery}/>
            {
              search
              ?<><Result landingpage={setState} data={resultsData}/><AppAdd/></>
              :<ServicePage landingpage={setState} data ={data}/>
            }
            <Footer/>
          </div>
}

export default Results;