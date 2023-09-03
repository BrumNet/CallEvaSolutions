import './styles/add_editservices.css'
import category from '../../../../categories.json'
import defaultpic from './common/assets/serviceimage.jpg'
import {useEffect, useRef, useState} from 'react';
import Cookies from 'js-cookie'
import { newService, updateService } from './bridge/bridge';
import { sessionData } from './data/alldata';

export function AddService (props){
    const nameRef = useRef(null),aboutRef = useRef(null), catRef = useRef(null), 
    subCatRef = useRef(null), priceRef = useRef(null), cityRef = useRef(null)
    const [err, setErr] = useState('')
    const fileRef = useRef()
    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        //convert to blob
            reader.onload = (event) => {
                resolve(event.target.result)
            };
        //read blob
            reader.readAsDataURL(file);
        }) 
    const [file, setFile] = useState(props?.data?.serviceprofilepic || defaultpic);
    function handleChange(e) {
        //setFile(URL.createObjectURL(e.target.files[0]));
        fileToDataUri(e.target.files[0]).then((file => {
            setFile(file)
            }))
    }

    const [subCategory, setSubCategory] = useState(category["All Services"])

    useEffect(() => {
        if(!props?.data?.serviceprofilepic) setFile(defaultpic)
        nameRef.current.defaultValue = props?.data?.packageName || "" 
        aboutRef.current.defaultValue = props?.data?.detail || '' 
        priceRef.current.defaultValue = props?.data?.price || '' 
        cityRef.current.defaultValue = props?.data?.city || ''
 
        if(props?.data){
        const catoptions = Array.from(catRef.current.options);
        const catoptionToSelect = catoptions.find(item => item.text === props?.data?.category);
        catoptionToSelect.selected = true;
        setSubCategory(category[props?.data?.category])
    }

    }, [props?.data])

    useEffect(() => {
        if(props?.data){
        const subcatoptions = Array.from(subCatRef.current.options);
        const subcatoptionToSelect = subcatoptions.find(item => item.text === props?.data?.subCategory);
        if(subcatoptionToSelect) subcatoptionToSelect.selected = true;
    }

    }, [subCategory])
    
    const execute = async () => {
        if(nameRef.current.value === '' ||aboutRef.current.value === '' || catRef.current.value === '' || 
        subCatRef.current.value === '' || priceRef.current.value === '' || cityRef.current.value === ''){
            return setErr("empty")  
        }
        const d = new Date()
        const email = Cookies.get('email');
        const serviceform = {
            providerEmail: email,
            packageName: nameRef.current.value, 
            category:  catRef.current.value, 
            detail: aboutRef.current.value,
            subCategory: subCatRef.current.value, 
            time: d.getUTCDate(),//DateTimeNow 
            price: priceRef.current.value, 
            country: "Liberia", 
            city: cityRef.current.value,
            serviceprofilepic: file,
            availability: sessionData?.profile?.Availability || ""
        }
        
            let user
            if(props?.data) {
                Array.from(Object.keys(serviceform)).forEach(x => {
                    if(serviceform[x] === props?.data[x]) delete serviceform[x]
                    //console.log(serviceform)
                })
                user = await updateService(serviceform, props?.data?._id) 
            }
            else user = await newService(serviceform)

            if (user?.code === 201) props?.change()

        //console.log(user)
    } 

    return <div id="addservice">
        <div className = "serviceimage">
            <div> <img src={file} alt="Service Image"/></div><br/>
            <input ref={fileRef} id="servicepicture" type='file'  onChange={handleChange}/><br/>
            <center><a  onClick={()=> fileRef.current.click()}> Add Image</a></center>
        </div>

        <div>
            <br/><br/>
            <label>Service Name</label><br/>
            <input ref={nameRef}/><br/><br/><br/>
            <label>About</label><br/>
            <input ref={aboutRef} id="inputabout" type='textarea'/><br/><br/><br/>
            <div>
                <div>Select Category<br/><select onChange={()=> setSubCategory(category[catRef.current.value])} ref={catRef}>
                    {/* {props?.data ? <option>{props?.data?.category}</option>:<></>} */}
                    {Array.from(Object.keys(category)).map((x) => <option>{x}</option>)}
                    </select></div>
                <div>Select SubCategory<br/><select ref={subCatRef}> 
                    {subCategory.map((x) => <option>{x}</option>)} 
                    </select></div>
            </div>
            <br/><br/>
            <label>Price</label><br/>
            <input ref={priceRef}/><br/><br/><br/>
            <label>City</label><br/>
            <input ref={cityRef}/><br/><br/><br/>
            {err === "empty"?<p>All entries must be filled</p>:<></>}
            <button onClick={()=>execute()}>Save</button>
        </div>
    </div>

}