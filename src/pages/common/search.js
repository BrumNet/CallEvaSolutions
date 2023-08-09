import './style/search.css'
import { Outlet, Link } from "react-router-dom";
import { SearchIcon } from './assets/searchicon';
import { LocationIcon } from './assets/location';

export function SearchBox (){
    return <div className="search">
                 
                    <div>
                        <button><LocationIcon/></button>
                        <select name="location" id="location">
                            <option value="broadstreet">Broad Street</option>
                            <option value="fiamah">Fiamah</option>
                            <option value="ny">New York</option>
                            <option value="or">Old Road</option>
                        </select>
                        <input placeholder='Search for a Service e.g. (Salon at Home, Plumber, Refrigerator)'/>
                        <button><Link to="/browse"><SearchIcon/></Link></button>
                    </div>
                    <center></center>
                 
          </div>
} 