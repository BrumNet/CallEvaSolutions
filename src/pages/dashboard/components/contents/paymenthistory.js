import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { Picture } from "./common/picture";

import { getPaymentHistory } from "./data/getPaymentHistory";
import { sessionData } from "./data/alldata";

import Cookies from "js-cookie";

export function PaymentHistory() {
  const user = useSelector((state) => state.user.value);

  const [data, setData] = useState({});

  const email = Cookies.get("email");

  const paymentHistoryColumns = user === "provider" 
  ? 
    ["","Customer","Service","Amount","Type","Status","Date",]
  : 
    ["", "Service", "Provider", "Amount", "Type", "Date"]

  const getData = async () => {

    const args = user === "provider" ? "serviceprovider" : "customer";

    //let paymentHistory = sessionData["phistory"];

    // if (!paymentHistory) {
      const details = await getPaymentHistory(email, args); //pass users email from redux/cached session
      sessionData["phistory"] = details;
      setData(details);
    // } else {
    //   setData(sessionData["phistory"]);
    // }
  };
  
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
                {
                  paymentHistoryColumns.map((x, i) => (
                      <td key={i}
                        onClick={() => {
                          setData(
                            data.sort((a, b) =>
                              a[x] > b[x] ? 1 : b[x] > a[x] ? -1 : 0,
                            ),
                          );
                        }}
                      >
                        {x}
                      </td>
                    ))
                }
              </tr>
            </thead>

            <tbody>
              {
              data.length === 0 
              ? 
                <tr>
                  <td colSpan={6}>
                    <center>
                      <h4>No Data Found</h4>
                    </center>
                  </td>
                </tr>
               : 
               user === "provider" 
                ? 
                Array.from(data).map((x, i) => (
                  <tr key={i}>
                    <td>{i + 1}.</td>
                    <td>{x["customerEmail"]}</td>
                    <td>{x["paymentsFor"]}</td>
                    <td>{x["amount"]}</td>
                    <td>{x["type"]}</td>
                    <td>{x["status"]}</td>
                    <td>{x["statusDate"]}</td>
                  </tr>
                ))
                :
                  Array.from(data).map((x, i) => (
                    <tr key={i}>
                      <td>{i + 1}.</td>
                      <td>{x["paymentsFor"]}</td>
                      <td>{x["serviceProviderEmail"]}</td>
                      <td>{x["amount"]}</td>
                      <td>{x["type"]}</td>
                      <td>{x["statusDate"]}</td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        }
      </center>
    </div>
  );
}
