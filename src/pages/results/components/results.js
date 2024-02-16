import "./styles/results.css";

import Cookies from "js-cookie";

import React, { useEffect, useState, useRef } from "react";

import { LocationIcon } from "./assets/location";
import { SearchIcon } from "./assets/searchicon";
import {Verified} from './assets/verified'

import "./styles/landingpage.css";
 
import { getResults } from "./data/getResults";

import { cartItems } from "../../cart/components/data/cartitems";

import convertCurrency from "../../fxns/convertcurrency";
 

export const Result = () => {

  var searchRef = useRef(null);
  var locationRef = useRef(null);

  const [data, setData] = useState({});
  const [curr, setCurr] = useState('USD')
  const [CartTotal, setCartTotal] = useState(0)

  const arr = Array.from(data);

  const locations = ["Central Monrovia","Sinkor","Airfield","Old Road","Congo Two","Boulevard","Paynesville ","ELWA","Marshall","Gardenersville","Barnesville","Caldwell","Brewerville",]

  
  useEffect(() => {
    if (Cookies.get("query")) {
      searchRef.current.defaultValue = Cookies.get("query").split("|")[1] || "";

      const locRefOpt = Array.from(locationRef.current.options);

      const locToSelect = locRefOpt.find(
        (item) => item.text === Cookies.get("query").split("|")[0],
      );

      locToSelect.selected = true;
    }
    getData();
  }, []);

    
  

  const Search = () => 
    <div className="search">
        <div>
          <button>
            <LocationIcon />
          </button>

          <select ref={locationRef} name="location" id="location">
            {locations.map((x,i) => <option key={i}>{x}</option>)}
          </select>

          <input
            ref={searchRef}
            type="text"
            placeholder="Search for a Service e.g. (Salon at Home, Plumber, Refrigerator)"
          />

          <button
            onClick={() => {
              Cookies.set("category", "");
              getData();
            }}
          >
            <SearchIcon />
          </button>
        </div>
        <center></center>
      </div>
  
  const CurrencyComp = () => <center id="choose_currency">
          <small>Currency: </small>
          <button className={curr === "USD" ? "active_currency":""} onClick={() => setCurr("USD")}>USD</button> 
          <button className={curr === "LRD" ? "active_currency":""} onClick={() => setCurr("LRD")}>LRD</button>
        </center>
 
  return (
    <>
      <Search/>
      <>
        <center><h3>Services Found</h3></center>  

        <CurrencyComp/>

        <div className="results"> 
          {
          data.length < 1 ? 
            <>
              <center><br/><br/> Sorry! No Results Found </center>
              <br/><br/><br/>
            </>
          : 
            arr.map((x, i) => (
              <div key={i}>
                {/* <div id="results_heading"><center>{x.packageName}</center></div>  */}
                
                {<div><img src={x.serviceprofilepic} alt={x.packageName}/></div> }
                
                <small><Verified/><a> Reviews: 0</a></small>
                
                <div id="results_content">
                  <h6>{x.packageName}</h6>
                  <small>{x.detail}</small><br />
                </div>

                  <center>
                    <small><LocationIcon />{x.city}, {x.country}</small>
                  </center> 
                  <br/>
                  {
                    cartItems[x._id]?._id
                    ?
                    <button className="added_to_cart" onClick={() => removeFromCart(x._id)}>
                                  <center>Remove from Cart : {convertCurrency(x.price, curr)}</center>
                    </button>
                    :
                    <button onClick={() => addToCart(x)}>
                      <center>Add to Cart : {convertCurrency(x.price, curr)}</center>
                    </button>
                  }
              </div>
            ))
          }
        </div>
      </>
    </>
  );

  function removeFromCart(id){
    setCartTotal(CartTotal-1)
    delete cartItems[id]
  }
  
  function addToCart(x){
    setCartTotal(CartTotal+1)
    return cartItems[x._id] = x
  }
 
  async function getData(){
    const details = await getResults();
    let detailsFilter = details;

    //From Category page
    if (Cookies.get("category")?.length > 1) {
      detailsFilter = details?.filter(
        (x) => x["category"] === Cookies.get("category"),
      );
      return setData(detailsFilter);
    }

    //from results filtering
    if (locationRef.current.value !== "" && details.length > 0)
      detailsFilter = details?.filter(
        (x) => x["city"] === locationRef.current.value,
      );

    if (searchRef.current.value !== "")
      detailsFilter = detailsFilter?.filter((x) =>
        JSON.stringify(x).includes(searchRef.current.value),
      );

    return setData(detailsFilter);
  }
}
