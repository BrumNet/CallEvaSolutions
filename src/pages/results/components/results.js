import './styles/results.css'
import { useEffect, useState } from 'react'
import browsepic from './assets/cleaning.jpg'
//import Cookies from 'js-cookie'
import { getResults } from './data/getResults'
import { LocationIcon } from './assets/location';
import { SearchIcon } from './assets/searchicon'; 


//get search results from cache
export function Result (props){
    
    var search = props.data;   
    const [data, setData] = useState({});
    const getData = async () => {
        const details = await getResults("Fashion")//pass url from cache
        setData(details)
        //console.log(data)
    }
    useEffect(() => {
        getData() 
      },  [search] );

   
    const arr = Array.from(data)

    return  <div className='results'>
                <div><center><SearchIcon/><br/></center></div>
                <div>
                {
                data==null
                ?<></>
                :arr.map(x => {
                        return <div>
                            <div><img src={x.serviceprofilepic || browsepic} alt="Get App On Play Store"/></div>
                            <br/><br/>
                            {x.packageName}<br/><br/>{search}
                            <LocationIcon/>{x.city}, {x.country}
                            <br/><br/><br/><br/>
                            <button onClick={()=> props.landingpage(x)}>Book for LB${x.price} </button>
                        </div>
                    })}
                </div>
            </div>
}