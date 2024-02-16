import React from "react";

import { Nav } from "../common/header";
import { SearchBox } from "../common/search";
import { Footer } from "../common/footer";

import { Category } from "./components/category";  

const Results = () => { 
 
  const getSuggestedQuery = () => {
    // setResultsData(query);
  };

  const setState = () => {
    // if (!data) return setsearch(true);
    // setsearch(false);
    // setData(data);
  };

  return (
    <div>
      <Nav setQuery={getSuggestedQuery}/>

      <SearchBox  setData={setState}/>

      <center> <h3>Categories</h3></center>

      <Category />

      <br /><br />
      <Footer />
    </div>
  );
};

export default Results;
