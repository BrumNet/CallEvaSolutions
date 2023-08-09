import { Nav } from "../common/header";
import { SearchBox } from "../common/search";
import { AppAdd } from "../common/appadd";
import { Footer } from "../common/footer";
import { Result } from "./components/results";

 const Results = () => {
   return <div>
      <Nav/>
      <SearchBox/>
      <Result/>
      <AppAdd/>
      <Footer/>
    </div>
}

export default Results;