import { NavW } from "../common/header";
import { SearchBox } from "../common/search";
import {useSelector } from 'react-redux'

import { Body } from "./body";
import { Footer } from "../common/footer";
import { Sign } from "../login/sign";

import { sessionData } from './components/contents/data/alldata'

 const DashBoard = () => {

  const user = useSelector((state) => state.user.value)

   return user === 'undefined' 
   ? <Sign/>
   : <div>
        <NavW/> 
        <SearchBox/><br/>
        <Body/><br/>
        <Footer/>
      </div>
}

export default DashBoard;