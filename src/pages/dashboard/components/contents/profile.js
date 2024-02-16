import React, { useEffect, useState, useRef } from "react";

import { useSelector } from "react-redux";

import { Picture } from "./common/picture";

import "./styles/profile.css";

import { getProfileDetails } from "./data/getProfileDetails";
import { sessionData } from "./data/alldata";

import Cookies from "js-cookie";

import { updateProfile } from "./bridge/bridge";

export const Profile = () => {

  const user = useSelector((state) => state.user.value);

  const nameRef = useRef(null),
    countryRef = useRef(null),
    addressRef = useRef(null),
    numberRef = useRef(null);

  const [data, setData] = useState({});
  const [updatedProfile, setUpdatedProfile] = useState(false);

  const email = Cookies.get("email");

  let updateForm = {},
    availability = {};

  let timeHr = ["06","07","08","09","10","11","12","01","02","03","04","05"]; //time(12)
  const timeMn = time(60);

  const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  
  useEffect(() => {
    getData();
    console.log(data.Availability);
  }, []);
  
  return (
    <div id="profile">
      <Picture getImage={getImage}
        profile={data?.profilePicture} data="change"/>

      <div>
        {
          data == null 
          ? 
            <></>
          : 
            <>
              <br /><br />
              <label>Name</label><br />
              <input ref={nameRef} defaultValue={data.name} /><br /><br /><br />
              <label>Contact Number</label><br />
              <input ref={numberRef} defaultValue={data.contact} /><br /><br /><br />
              <label>Country</label><br />
              <input ref={countryRef} defaultValue={data.country} /><br /><br /><br />
              <label>Address</label><br />
              <input ref={addressRef} defaultValue={data.address} /><br /><br /><br />
            </>
        }
      </div>

      {user === "provider" 
      ? 
        <div>
          <p>Availability</p>

          <div>
            {
            daysOfTheWeek.map((x) => {

              if (!availability.x) availability[x] = ["Available", "6", "00", "am", "6", "00", "pm"];

              return (
                <>
                  <div>
                    <span>{x}</span>
                    <span>
                      : {JSON.parse(data?.Availability || "{}")?.[x]?.[0] || ""}{" "}
                    </span> <br /><br />

                    <select onChange={(e) => appendAv(x, 0, e.target.value)}>
                      {["Available", "UnAvailable"].map((a, i) => (
                        <option key={i}
                          selected = {
                                        a === JSON.parse(data?.Availability || "{}")?.[x]?.[0]
                                          ? 
                                            true
                                          : 
                                            false
                                      }
                        >
                          {a}
                        </option>
                      ))}
                    </select>
                    <select onChange={(e) => appendAv(x, 1, e.target.value)}>
                      {timeHr.map((a,i) => (
                        <option key={i}
                          selected={
                            a ===
                            JSON.parse(data?.Availability || "{}")?.[x]?.[1]
                              ? true
                              : false
                          }
                        >
                          {a}
                        </option>
                      ))}
                    </select>
                    <select onChange={(e) => appendAv(x, 2, e.target.value)}>
                      {timeMn.map((a,i) => (
                        <option key={i}
                          selected={
                            a ===
                            JSON.parse(data?.Availability || "{}")?.[x]?.[2]
                              ? true
                              : false
                          }
                        >
                          {a}
                        </option>
                      ))}
                    </select>
                    <select onChange={(e) => appendAv(x, 3, e.target.value)}>
                      {["am", "pm"].map((a, i) => (
                        <option key={i}
                          selected={
                            a ===
                            JSON.parse(data?.Availability || "{}")?.[x]?.[3]
                              ? true
                              : false
                          }
                        >
                          {a}
                        </option>
                      ))}
                    </select>
                    -
                    <select onChange={(e) => appendAv(x, 4, e.target.value)}>
                      {timeHr.map((a,i) => (
                        <option key={i}
                          selected={
                            a ===
                            JSON.parse(data?.Availability || "{}")?.[x]?.[4]
                              ? true
                              : false
                          }
                        >
                          {a}
                        </option>
                      ))}
                    </select>
                    <select onChange={(e) => appendAv(x, 5, e.target.value)}>
                      {timeMn.map((a, i) => (
                        <option key={i}
                          selected={
                            a ===
                            JSON.parse(data?.Availability || "{}")?.[x]?.[5]
                              ? true
                              : false
                          }
                        >
                          {a}
                        </option>
                      ))}
                    </select>
                    <select onChange={(e) => appendAv(x, 6, e.target.value)}>
                      {["pm", "am"].map((a, i) => (
                        <option key={i}
                          selected={
                            a ===
                            JSON.parse(data?.Availability || "{}")?.[x]?.[6]
                              ? true
                              : false
                          }
                        >
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                  <br />
                </>
              );
            })}
          </div>
        </div>
      :
        ""
      }

      {
        updatedProfile 
        ? 
          <center>Updated!</center> 
        : 
          <></>
      }<br />

      <button onClick={() => editProfile()}>Save</button>
    </div>
  );

  async function getData (){

    let getProfile = sessionData["profile"];

    if (!getProfile) {

      const args = user === "provider" ? "/serviceprofile/" : "/customerprofile/";

      const details = await getProfileDetails(email, args);
      sessionData["profile"] = details;
      setData(details);
    } else {
      setData(sessionData["profile"]);
    }
  }

  function getImage(file){
    appendField("profilePicture", data.picture, file);
  }
  
  async function editProfile(){
    appendField("name", data.name, nameRef.current?.value);
    appendField("contact", data.contact, numberRef.current?.value);
    appendField("country", data.country, countryRef.current?.value);
    appendField("address", data.address, addressRef.current?.value);
    appendField(
      "Availability",
      data.Availability,
      JSON.stringify(availability),
    );

    const args = user === "provider" ? "/serviceprofile/" : "/customerprofile/";

    let update;
    if (data) update = await updateProfile(data?._id, args, updateForm);

    if (update?.code === 201) setUpdatedProfile(true);
  }

  function appendField (field, initialValue, fieldData){
    if (initialValue !== fieldData) updateForm[field] = fieldData;
  }

  function appendAv (day, index, value){
    //return
    availability[day][index] = value;
  }

  function time(x){
    const arr = [];
    
    for (let i = 0; i < x; i++) {
      const v = "" + i;

      if (x === 12 && i === 0) arr.push("12");
      else {
        if (v.length == 1) arr.push("0" + i);
        else arr.push("" + i);
      }
    }
    return arr;
  }
}
