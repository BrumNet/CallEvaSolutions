import "./style/search.css";

import React, { useRef } from "react";

import { Link } from "react-router-dom";

import { SearchIcon } from "./assets/searchicon";
import { LocationIcon } from "./assets/location";

import Cookies from "js-cookie";

function setCookiesForSearch (searchLocation, searchValue){
  Cookies.set("category", "");

  Cookies.set("query", searchLocation + "|" + searchValue );
}

const SearchBox = () => {

  const searchRef = useRef();
  const locRef = useRef();
  
  const locations = ["Central Monrovia","Sinkor","Airfield","Old Road","Congo Two","Boulevard","Paynesville ","ELWA","Marshall","Gardenersville","Barnesville","Caldwell","Brewerville",]

  return (
    <div className="search">
      <div>
        <button><LocationIcon /></button>

        <select ref={locRef} name="location" id="location">
          {
            locations.map((x,i) => <option key={i}>{x}</option>)
          }
        </select>

        <input ref={searchRef} type="text"
          placeholder="Search for a Service e.g. (Salon at Home, Plumber, Refrigerator)"
        />

        <button onClick={() => setCookiesForSearch(locRef.current.value ,searchRef.current.value)}>
          <Link to="/browse"> <SearchIcon /> </Link>
        </button>
      </div> 
    </div>
  );
}

export {SearchBox};