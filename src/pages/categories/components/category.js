import React from "react";

import "./styles/categories.css";
 
import images from "./assets/images/images";
// import { SearchIcon } from './assets/searchicon';

import categories from "../../../categories.json";

import Cookies from "js-cookie";

import { Link } from "react-router-dom";
 
export function Category() {
  const arr = Array.from(Object.keys(categories));

  return (
    <div className="categories">
      {
        arr.map((x, i) => {
          return (
            <div key={i}
              onClick={() =>
                x === "All Services"
                  ? Cookies.set("category", "")
                  : Cookies.set("category", x)
              }
            >

              <Link to="/browse">
                <>
                  <div>
                    <img src={images[i]} alt={x} />
                  </div>
                  <button>{x}</button>
                </>
              </Link>

            </div>
          );
        })
      }
    </div>
  );
}
