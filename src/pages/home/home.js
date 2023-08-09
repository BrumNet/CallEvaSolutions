import './home.css'
import { Nav } from "../common/header";
import { SearchBox } from "../common/search";
import { Hero } from "./components/hero";
import { Happiness } from "./components/happiness";
import { WhyChooseEva } from "./components/whychooseeva";
import { AppAdd } from "../common/appadd";
import { Footer } from "../common/footer";

 const Home = () => {
   return <div id="home">
      <Nav/>
      <Hero/>
      <SearchBox/>
      <Happiness/>
      <WhyChooseEva/>
      <AppAdd/>
      <Footer/>
    </div>
}

export default Home;
//  <WhyChooseEva/>