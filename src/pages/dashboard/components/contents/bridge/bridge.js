/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import axios, * as others from "axios";
import { sessionData } from "../data/alldata";

export async function newService(data) {
  const base = process.env.REACT_APP_BACKEND_URL;

  return await axios
    .post(base + "/services", data, {
      headers: {
        //'Authorization': "Bearer "+ bearer_token,
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      if (sessionData?.MyServices) delete sessionData.MyServices;
      return response.data;
    })
    .catch(function () {
      //console.log(error);
    });
}

export async function updateService(data, id) {
  const base = process.env.REACT_APP_BACKEND_URL;

  return await axios
    .put(base + "/services/" + id, data, {
      headers: {
        //'Authorization': "Bearer "+ bearer_token,
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      //console.log(response);
      if (sessionData?.MyServices) delete sessionData.MyServices;
      return response.data;
    })
    .catch(function () {
      // console.log(error);
    });
}

export async function updateProfile(id, args, data) {
  const base = process.env.REACT_APP_BACKEND_URL;
  const url = base + args + id;
  //console.log(url)
  return await axios
    .put(url, data, {
      headers: {
        //'Authorization': "Bearer "+ bearer_token,
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      if (sessionData?.profile) delete sessionData.profile;
      return response.data;
    })
    .catch(function () {
      //console.log(error);
    });
}

export async function updateRequest(data, id) {
  const base = process.env.REACT_APP_BACKEND_URL;

  return await axios
    .put(base + "/servicerequest/" + id, data, {
      headers: {
        //'Authorization': "Bearer "+ bearer_token,
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      //console.log(response);
      if (sessionData?.reqservices) delete sessionData.reqservices;
      return response.data;
    })
    .catch(function () {
      // console.log(error);
    });
}
