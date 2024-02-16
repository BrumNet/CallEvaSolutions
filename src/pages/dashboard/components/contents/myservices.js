/* eslint-disable react/prop-types */
import { Picture } from "./common/picture";

import React, { useEffect, useState } from "react";

import { getServices } from "./data/getServices";
import { sessionData } from "./data/alldata";

import Cookies from "js-cookie";

export const MyServices = (props) => {

  const [xdata, setData] = useState({});

  const email = Cookies.get("email");

  const serviceColumns = ["","Service","Category","Sub Category", "Price","City", "Actions"]

  async function getData() {
    //let getMyServices = sessionData["MyServices"];

    //if (!getMyServices) {
      const details = await getServices(email);
      sessionData["MyServices"] = details;
      setData(details);
    // } 
    // else {
    //   setData(sessionData["MyServices"]);
    // }
  }
  
  //TODO: if redux getStatechanged
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        <Picture />
      </div>

      <center className="req_service">
        {
          xdata == null 
          ? <></>
          : 
            <table>
              <thead>
                <tr>
                  {serviceColumns.map((x,i) => <td key={i}>{x}</td>)}
                </tr>
              </thead>

              <tbody>
                {xdata.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <center>
                        <h4>Loading</h4>
                      </center>
                    </td>
                  </tr>
                ) : (
                  Array.from(xdata).map(
                    (x, i) => (
                      <tr key={i}>
                        <td>{i + 1}. </td>
                        <td>{x["packageName"]}</td>
                        <td>{x["category"]}</td>
                        <td>{x["subCategory"]}</td>
                        <td>{x["price"]}</td>
                        <td>{x["city"]}</td>
                        <td>
                          <button onClick={() => props.change(x)}>Edit</button>
                          <button id={"delete" + x["_id"]}>Delete</button>
                        </td>
                      </tr>
                    ),
                  )
                )}
              </tbody>
            </table>
        }
      </center>
    </div>
  );
}
