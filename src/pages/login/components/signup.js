import './styles/signup.css'

import { useState, useRef } from "react"
import { signUp } from '../bridge/bridge'

export function SignUp(props){

    const [privilege, setPrivilege] = useState("Customer")
    const [error, setError] = useState("None")

    const fnameRef = useRef(null),lnameRef = useRef(null), signupForm = {},
    emailRef = useRef(null),contactRef = useRef(null), linkRef = useRef(null),
    pwdRef = useRef(null), cpwdRef = useRef(null)

    const validateEmail = (email) => {
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (email.match(emailReg)) return true;
    } 

    const validatePhone = (phone) => {
        const phoneReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        if (phone.match(phoneReg)) return true;
    }

   const signUpRes = async () => {
    
    if(fnameRef.current.value === ""  || lnameRef.current.value === ""  ||  
    emailRef.current.value === ""  || pwdRef.current.value === ""  || 

    contactRef.current.value === "") return setError("rqd");  
    if(pwdRef.current.value !== cpwdRef.current.value) return setError("pwd");
    
    if(!validateEmail(emailRef.current.value))  return setError("email");
    if(!validatePhone(contactRef.current.value))  return setError("phone");    

    signupForm.name = fnameRef.current.value +" "+ lnameRef.current.value; 
    signupForm.email = emailRef.current.value

    signupForm.contact = contactRef.current.value
    //pwdRef.current.value
    const user = await signUp(signupForm, pwdRef.current.value, privilege )

    //console.log(user)
    if(user?.code === 201) {
        setError("None"); 
        alert("Your Account has been created. Kindly Login with your credentials");
        return props.change()
    }

    if(user?.code === 400) return setError("username")
    else return setError("unknown")
   }
    //signupForm.address = ""
    return (
        <div id="signuppage">

            <center>SignUp As {privilege}</center><br/>
            <center>
                <button onClick={()=> setPrivilege("Customer")} className={privilege==="Customer"?'logactive':""}>Customer</button>
                <button onClick={()=> setPrivilege("Provider")} className={privilege==="Provider"?'logactive':""}>Provider</button>
            </center>
            {/*<center>Social Media Icons</center>*/}

            <br/>
            <center><input ref={fnameRef} placeholder='First Name'/><input ref={lnameRef} placeholder='Last Name'/><br/></center>
            <center><input ref={emailRef} placeholder='Email'/><input ref={contactRef} type="tel" placeholder='Contact Number'/><br/></center>
            <center><input ref={pwdRef} type="password" placeholder='Password'/><input ref={cpwdRef} type="password" placeholder='Confirm Password'/><br/></center>
            
            {error === "pwd"?<p>Password doesn't match</p>:<></>}
            {error === "phone"?<p>Kindly Check Your Phone Number</p>:<></>}
            {error === "email"?<p>Kindly Check Your Email</p>:<></>}
            {error === "rqd"?<p>All Inputs Are Required</p>:<></>}
            {error === "username"?<p>Email Already Exists</p>:<></>}
            {error === "unknown"?<p>An Error Occured.<br/><br/>Try Again In A Few Minutes</p>:<></>}

            <div><span><small>By signing up, you agree to CallEva Terms and Conditions</small></span></div>
            <button onClick={() => signUpRes() }>SignUp</button><br/><br/> 
        </div>
    )
}