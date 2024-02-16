/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import axios, * as others from "axios";

export async function submitPayment(data) {
  const base = process.env.REACT_APP_BACKEND_URL;

  return await axios
    .post(base + "/payments/customer", data, {
      headers: {
        //'Authorization': "Bearer "+ bearer_token,
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function () {
      //console.log(error);
    });
}

export async function executeRequestNotification(data) {
  const base = process.env.REACT_APP_BACKEND_URL;

  return await axios
    .post(base + "/servicerequest/customer/", data, {
      headers: {
        //'Authorization': "Bearer "+ bearer_token,
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function () {
      //console.log(error);
    });
}
