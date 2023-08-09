import { Nav } from "../common/header";
import { SearchBox } from "../common/search";
import { Footer } from "../common/footer";
import { ServicePage } from "./components/landingpage";

 const LandingPage = () => {
   return <div>
      <Nav/>
      <SearchBox/>
      <ServicePage/>
      <Footer/>
    </div>
}

export default LandingPage;