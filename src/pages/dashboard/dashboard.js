import { NavW } from "../common/header";
import { SearchBox } from "../common/search";
import { Body } from "./body";
import { Footer } from "../common/footer";

 const DashBoard = () => {
   return <div>
      <NavW/> 
      <SearchBox/><br/>
      <Body/><br/>
      <Footer/>
    </div>
}

export default DashBoard;