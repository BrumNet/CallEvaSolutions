import './style/search.css'
import { useRef } from 'react';
import { Outlet, Link } from "react-router-dom";
import { SearchIcon } from './assets/searchicon';
import { LocationIcon } from './assets/location';
import Cookies from 'js-cookie'


export function SearchBox (){
    const searchRef = useRef()
    const submitSearch = () => {
        const url = searchRef.current?.value || ""
        Cookies.set('search', url )
    }
    //Use cache to pass data
    return <div className="search">
                 
                    <div>
                        <button><LocationIcon/></button>
                        <select name="location" id="location">
                            <option value="broadstreet">Broad Street</option>
                            <option value="fiamah">Fiamah</option>
                            <option value="ny">New York</option>
                            <option value="or">Old Road</option>
                        </select>
                        <input ref={searchRef} type='text' placeholder='Search for a Service e.g. (Salon at Home, Plumber, Refrigerator)'/>
                        <button onClick={submitSearch()}><Link to="/browse"><SearchIcon/></Link></button>
                    </div>
                    <center></center>
                 
          </div>
} 