import './styles/results.css'

import browsepic from './assets/cleaning.jpg'
import Cookies from 'js-cookie'

import { useEffect, useState, useRef } from 'react'
import { getResults } from './data/getResults'

import { LocationIcon } from './assets/location';
import { SearchIcon } from './assets/searchicon'; 


//get search results from cache
export function Result (props){ 

    var searchRef = useRef(null);  
    var locationRef = useRef(null);   


    const [data, setData] = useState({});

    const getData = async () => {
        const details = await getResults() 
        let detailsFilter = details

        //From Category page
        if(Cookies.get("category")?.length > 1) 
        {
            detailsFilter = details?.filter(x => x["category"] === Cookies.get("category")) 
            return setData(detailsFilter)
        }

        //from results filtering
        if(locationRef.current.value !== "" && details.length > 0) detailsFilter = details?.filter(x => x["city"] === locationRef.current.value)
        if(searchRef.current.value !== "") 
                detailsFilter = detailsFilter?.filter(x => JSON.stringify(x).includes(searchRef.current.value))
        
        console.log("exec")
        return setData(detailsFilter)
    }
    
    useEffect(() => {
        
    searchRef.current.defaultValue = Cookies.get("query").split("|")[1] || ""
    
    const locRefOpt = Array.from(locationRef.current.options)
    
    const locToSelect = locRefOpt.find(item => item.text === Cookies.get("query").split("|")[0])

    locToSelect.selected = true

    getData()
}, []); 
    const arr = Array.from(data)


    return  <>
        <div className="search">
                 
                 <div>
                     <button><LocationIcon/></button>
                     <select ref={locationRef} name="location" id="location">{
                         ["Central Monrovia", "Sinkor","Airfield","Old Road","Congo Two","Boulevard",
                         "Paynesville ","ELWA","Marshall","Gardenersville","Barnesville","Caldwell","Brewerville"].map(x => <option>{x}</option>)
                     }
                     </select>
                     <input ref={searchRef} type='text' placeholder='Search for a Service e.g. (Salon at Home, Plumber, Refrigerator)'/>
                     <button onClick={()=> {Cookies.set("category", "");getData()}}><SearchIcon/></button>
                 </div>
                 <center></center>
              
       </div>
        <div className='results'> 
              <center><h3>Services Found</h3></center>
                {
                    arr.length < 1 ? <><center><br/><br/><b>0 Results</b></center><br/><br/><br/></>
                    : arr.map(x =>  <div>
                                            <div><img src={x.serviceprofilepic || browsepic} alt={x.packageName}/></div><br/><br/>
                                            {x.packageName}<br/><br/> 
                                            
                                            <LocationIcon/>{x.city}, {x.country} 
                                            <button onClick={()=> props.landingpage(x)}>Get for {x.price} </button>
                                    </div>
                    )
                } 
            </div>
    </>
}