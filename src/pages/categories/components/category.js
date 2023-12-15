import './styles/categories.css' 
import browsepic from './assets/cleaning.jpg' 
import images from './assets/images/images'
// import { SearchIcon } from './assets/searchicon'; 

import categories from '../../../categories.json'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

//get search results from cache
export function Category(){ 
   
   
    const arr = Array.from(Object.keys(categories))
    
    //<div><center><SearchIcon/><br/></center></div>

    return  <div className='categories'> 
                {
                arr.map((x,i) => {
                        return <div onClick={()=> x === "All Services" ? Cookies.set("category", "") : Cookies.set("category", x)}>
                            <Link to="/browse">
                            <div><img src={images[i]||browsepic} alt={x}/></div>
                            <button>{x}</button> 
                            </Link>
                        </div>
                    })} 
            </div>
}