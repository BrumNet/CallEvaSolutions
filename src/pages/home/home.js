import React from "react";

import "./home.css";

import { Nav } from "../common/header";
import { SearchBox } from "../common/search";
import { AppAdd } from "../common/appadd";
import { Footer } from "../common/footer";

import { Hero } from "./components/hero";
import { Happiness } from "./components/happiness";
import { WhyChooseEva } from "./components/whychooseeva";

const Home = () => {
  return (
    <div id="home">
      <Nav />
      <Hero />
      <SearchBox />
      <Happiness />
      <WhyChooseEva />
      <AppAdd />
      <Footer />
    </div>
  );
};

export default Home; 
