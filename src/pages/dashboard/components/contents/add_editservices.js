/* eslint-disable react/prop-types */
import "./styles/add_editservices.css";

import category from "../../../../categories.json";
import cities from "../../../../cities.json";

import defaultpic from "./common/assets/serviceimage.jpg";

import React, {useEffect, useRef, useState } from "react";

import Cookies from "js-cookie";

import { newService, updateService } from "./bridge/bridge";

import { sessionData } from "./data/alldata";

export const AddService = (props) => {

  const nameRef = useRef(null),
    aboutRef = useRef(null),
    catRef = useRef(null),
    subCatRef = useRef(null),
    priceRef = useRef(null),
    cityRef = useRef(null),
    currencyRef = useRef(null);

  const [err, setErr] = useState("");
  const [file, setFile] = useState(props?.data?.serviceprofilepic || defaultpic);
  const [subCategory, setSubCategory] = useState(category["Real Estate Booking"]);

  const fileRef = useRef();

  let serviceform = {}

  useEffect(() => {
    nameRef.current.defaultValue = props?.data?.packageName || "";
    aboutRef.current.defaultValue = props?.data?.detail || "";
    priceRef.current.defaultValue = props?.data?.price?.substring(3) || "";
    cityRef.current.defaultValue = props?.data?.city || "";

    if (!props?.data?.serviceprofilepic) setFile(defaultpic);
    
    if (props?.data) {
      setCategoryDropDown()
      setCityDropDown()
      setCurrencyDropDown()
      setSubCategory(category[props?.data?.category]);
    }
  }, [props?.data]);

  useEffect(() => {
    if (props?.data) setSubCategoryDropDown()
  }, [subCategory]);

  return (
    <div id="addservice">
      <div className="serviceimage">
        <div>{" "}<img src={file} alt="Service Image"/></div><br />
        <input ref={fileRef} id="servicepicture" type="file" onChange={handleChange}/><br />
        <center><a onClick={() => fileRef.current.click()}>Add Image</a></center>
      </div>

      <div><br /><br />
        <label>Service Name</label><br />
        <input ref={nameRef} /><br /><br /><br />
        <label>About</label><br />
        <input ref={aboutRef} id="inputabout" type="textarea" /><br /><br /><br />
        <div>
          <div>
            Select Category<br /><br />
            <select onChange={() => setSubCategory(category[catRef.current.value])} ref={catRef}>
              {
                Array.from(Object.keys(category)).map((x,i) => (
                  <option key={i}>{x}</option>
                ))
              }
            </select>
          </div>

          <div>
            Select SubCategory<br /><br />
            <select ref={subCatRef}>{subCategory.map((x, i) => <option key={i}>{x}</option>)}</select>
          </div>
        </div><br /><br />

        <label>Price</label><br /><br />

        <select ref={currencyRef}>
          <option>LRD</option>
          <option>USD</option>
        </select>{"  "}

        <input placeholder="0" type="number" ref={priceRef} /><br /><br /><br />

        <label>City</label><br/><br/>

        <select ref={cityRef}>
          {cities["cities"].map((x,i) => (
            <option key={i}>{x}</option>
          ))}
        </select>

        {
          err === "empty" 
          ? <p>All entries must be filled</p> 
          : <></>
        }

        <button onClick={() => addOrUpdateService()}>Save</button>
      </div>
    </div>
  );

  function fileToDataUri(file){    
    return new Promise((resolve) => {
      const reader = new FileReader();
      //convert to blob
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      //read blob
      reader.readAsDataURL(file);
    });
  }
  
  function handleChange(e) {
    fileToDataUri(e.target.files[0]).then((file) => {
      setFile(file);
    });
  }

  function checkIfInputsEmpty(){
    return nameRef.current.value === "" ||
    aboutRef.current.value === "" ||
    catRef.current.value === "" ||
    // subCatRef.current.value === '' ||
    priceRef.current.value === "" ||
    cityRef.current.value === ""
  }

  function setCityDropDown(){
      const cityRefOpt = Array.from(cityRef.current.options);
      const cityToSelect = cityRefOpt.find((item) => item.text === props?.data?.city);
      cityToSelect.selected = true;
  }

  function setCategoryDropDown(){
    const catoptions = Array.from(catRef.current.options);
      const catoptionToSelect = catoptions.find(
        (item) => item.text === props?.data?.category,
      );
      catoptionToSelect.selected = true;
  }

  function setSubCategoryDropDown(){
    const subcatoptions = Array.from(subCatRef.current.options);
      const subcatoptionToSelect = subcatoptions.find(
        (item) => item.text === props?.data?.subCategory,
      );
      if (subcatoptionToSelect) subcatoptionToSelect.selected = true;
  }

  function setCurrencyDropDown(){
    const currencyRefOpt = Array.from(currencyRef.current.options);
      const currencytoSelect = currencyRefOpt.find(
        (item) => item.text === props?.data?.price?.substring(0, 3),
      );

      currencytoSelect.selected = true;
  }

  function removeDuplicateFields(){
    Array.from(Object.keys(serviceform))
    .forEach((x) => {
      if (serviceform[x] === props?.data[x]) delete serviceform[x];
    });
  }
  
  async function addOrUpdateService (){

    const d = new Date();
    const email = Cookies.get("email");

    if (checkIfInputsEmpty()) return setErr("empty");

    serviceform = {
      providerEmail: email,
      packageName: nameRef.current.value,
      category: catRef.current.value,
      detail: aboutRef.current.value,
      subCategory: subCatRef.current.value,
      time: d.getUTCDate(), //DateTimeNow
      price: currencyRef.current.value + priceRef.current.value,
      country: "Liberia",
      city: cityRef.current.value,
      serviceprofilepic: file,
      availability: sessionData?.profile?.Availability || "",
    };
    
    let user;

    if(props?.data) removeDuplicateFields()
    
    props?.data 
    ? user = await updateService(serviceform, props?.data?._id)
    : user = await newService(serviceform);

    if (user?.code === 201) props?.change();
  }


}
