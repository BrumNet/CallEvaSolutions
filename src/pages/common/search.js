import './style/search.css'
import { useRef } from 'react';
import { Outlet, Link } from "react-router-dom";

import { SearchIcon } from './assets/searchicon';
import { LocationIcon } from './assets/location';
import Cookies from 'js-cookie'


export function SearchBox (){
    const searchRef = useRef() 
    const locRef = useRef() 
    //Use cache to pass data
    return <div className="search">
                 
                    <div>
                        <button><LocationIcon/></button>
                        <select ref={locRef} name="location" id="location">{
                            ["Central Monrovia", "Sinkor","Airfield","Old Road","Congo Two","Boulevard",
                            "Paynesville ","ELWA","Marshall","Gardenersville","Barnesville","Caldwell","Brewerville"].map(x => <option>{x}</option>)
                        }
                        </select>
                        <input ref={searchRef} type='text' placeholder='Search for a Service e.g. (Salon at Home, Plumber, Refrigerator)'/>
                        <button onClick={()=> {Cookies.set("category",""); Cookies.set("query", locRef.current.value + "|" + searchRef.current.value)}}><Link to="/browse"><SearchIcon/></Link></button>
                    </div>
                    <center></center>
                 
          </div>
} 