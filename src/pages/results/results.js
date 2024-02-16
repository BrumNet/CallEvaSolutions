import { Nav } from "../common/header"; 

import { AppAdd } from "../common/appadd";
import { Footer } from "../common/footer";
 
import { Result } from "./components/results"; 

import React, { useState } from "react";

const Results = () => {
  const [resultsData, setResultsData] = useState(""); 
    
  const getSuggestedQuery = (query) => {
    setResultsData(query);
  };

 

  return (
    <div>
      <Nav setQuery={getSuggestedQuery} />
      
        <>
          <Result data={resultsData} />
          <AppAdd />
        </> 

      <Footer />
    </div>
  );
};

export default Results;
