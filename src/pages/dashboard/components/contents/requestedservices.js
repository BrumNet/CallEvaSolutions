import "./styles/requestedservice.css";

import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { Picture } from "./common/picture";

import { updateRequest } from "./bridge/bridge";

import { getReqServices } from "./data/getReqServices";
import { sessionData } from "./data/alldata";

import Cookies from "js-cookie";

import { Cancel } from "../../assets/cancel";
import { Done } from "../../assets/done";
import { CallCustomer } from "../../assets/call";
import { Cart } from "../../../results/components/assets/buy";

export function RequestedServices() {

  const user = useSelector((state) => state.user.value);

  const [data, setData] = useState({});

  const email = Cookies.get("email");

  const requestedServicesColumn = user === "provider"
  ?
  ["", "Customer", "", "Service", "Price", "Payment", "Status", ""]
  :
  ["", "Service", "Category", "Subcategory", "Price", "Provider", "Status", "",]

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
        data == null 
        ?
          <></>
        : 
          <table>
            <thead>
              <tr>
                {requestedServicesColumn.map((x, i) => <td key={i}>{x}</td>)}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <center>
                      <h4>No Data Found</h4>
                    </center>
                  </td>
                </tr>
              ) : user === "provider" ? (
                Array.from(data).map(
                  (x, i) => (
                    <tr key={i}>
                      <td>{i + 1}.</td>
                      <td>{x["customerEmail"]}</td>
                      <td>
                        <a href={"tel:" + x["requestNumber"]}>
                          <CallCustomer />
                        </a>
                      </td>
                      <td>{x["package"]}</td>

                      <td>{x["price"]}</td>
                      <td>{x["payment"]}</td>

                      <td>{x["status"]}</td>
                      <td>
                        {
                          /* <td>{x["date"]}</td> */
                          //delete service request upon revoking, assign service to another user.
                          x["status"] === "Pending" ? (
                            <>
                              <button
                                title="Accept Service"
                                onClick={() =>
                                  updateRequestStatus("Accepted", x["_id"])
                                }
                              >
                                <Done />
                              </button>
                              <button
                                title="Revoke Service"
                                onClick={() =>
                                  updateRequestStatus("Revoked", x["_id"])
                                }
                              >
                                <Cancel />
                              </button>
                            </>
                          ) : x["status"] === "Accepted" ? ( //notify admin
                            <>
                              <button
                                title="Request Payment"
                                onClick={() =>
                                  updateRequestStatus("Completing", x["_id"])
                                }
                              >
                                <Cart />
                              </button>
                            </>
                          ) : (
                            <></>
                          )
                        }
                      </td>
                    </tr>
                  ),
                  /**
                     Payment Status for payments
                     Status for execution of service
                     */
                )
              ) : (
                Array.from(data).map((x, i) => (
                  <tr key={i}>
                    <td>{i + 1}.</td>
                    <td>{x["package"]}</td>
                    <td>{x["category"]}</td>

                    <td>{x["subcategory"]}</td>
                    <td>{x["price"]}</td>

                    <td>{x["serviceProviderEmail"]}</td>
                    <td>{x["status"]}</td>
                    {/* <td>{x["date"]}</td> */}
                    <td>
                      <button
                        onClick={() =>
                          updateRequestStatus("Completed", x["_id"])
                        }
                        title="Click to suggest service completion"
                      >
                        <Done />
                      </button>
                    </td>
                    {/**Change Pending/Accepted to Rendered, Change Pending to  */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        }
      </center>
    </div>
  );

  async function updateRequestStatus(x, id){
    // const result = 
    await updateRequest({ status: x }, id);
    // x == "Completed" ? await updatePayment(id, bpdy) : null
  }
  
  async function getData (){

    const args = user === "provider" ? "serviceprovider" : "customer";

    //let getRservice = sessionData["reqservices"];

    //if (!getRservice) {
      const details = await getReqServices(email, args); //pass users email from redux/cached session

      sessionData["reqservices"] = details;
      setData(details);
    // } else {
    //   setData(sessionData["reqservices"]);
    // }
  }
}
