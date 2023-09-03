import defaultpic from './assets/profile.png'
import './picture.css' 
import { useEffect, useRef, useState } from 'react';
import { sessionData } from '../data/alldata';
import Cookies from 'js-cookie'

export function Picture (props){
    let profilePicture = sessionData["profile"]?.profilePicture || defaultpic;

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        //convert to blob
            reader.onload = (event) => {
                resolve(event.target.result)
            };
        //read blob
            reader.readAsDataURL(file);
        }) 
    const fileRef = useRef()
    
    useEffect(() =>{
        if(profilePicture) setFile(profilePicture)
        //if(props?.profile) setFile(props?.profile)
    }, [props?.profile,profilePicture])

    const [file, setFile] = useState(profilePicture);

    
    //console.log(blob)
    
    //setFile()
    
    function handleChange(e) {
        fileToDataUri(e.target.files[0]).then((file => {
            setFile(file)
            props?.getImage(file)
            }))
        
            //alert(blobToText(e.target.files[0]))
        //setFile(URL.createObjectURL()); s
    }
    return  <center>
                <div>
                    <div id="imagecontainer">
                        <img src={file} alt={"profile"}/>
                    </div>
                </div>
                <div> <br/>{props?.data ? <a id="picture" onClick={()=> fileRef.current.click()}>Change Profile Picture</a>: <></>}<input ref={fileRef} id="filebutton" type='file'  onChange={handleChange}/></div>
                <div>
                    <div id="name">
                    {/*email*/}
                    </div>
                </div>
            </center>
}