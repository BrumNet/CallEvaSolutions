import React from "react";

import "./styles/hero.css";

import h1 from "./assets/heropicture1.jpg";
import h2 from "./assets/heropicture2.jpg";

export function Hero() {
  return (
    <div className="hero">
      <div></div>
      <div>
        <img src={h1} alt="Calleva Services - Cleaning" />
      </div>
      <div>
        <img src={h2} alt="Calleva Services - Carpentry" />
      </div>

      <div>
        <h2>
          QUALITY
          SERVICES,
          ON DEMAND
        </h2>
        <p>Get access to reliable and affordable services</p>
      </div>
    </div>
  );
}
