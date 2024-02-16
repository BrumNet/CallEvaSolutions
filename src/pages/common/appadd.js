import "./style/appadd.css";

import phone from "./assets/app.jpg";
import playstore from "./assets/playstore.jpg";
import appstore from "./assets/appstore.jpg";

import React from "react";

import { Link } from "react-router-dom";

export function AppAdd() {
  return (
    <div className="appadd">

      <center>
        <div id="applink">
          <div>
            <Link>
              <img src={playstore} alt="Get App On Play Store" />
              <img src={appstore} alt="Get App On App Store" />
            </Link>
          </div>
        </div>
      </center>

      <center>
        <div id="phoneimage">
          <Link>
            <img src={phone} alt="Calleva App" />
          </Link>
        </div>
      </center>

      <center>
        <h4>Get the CallEva App</h4>
      </center>
      
    </div>
  );
}
