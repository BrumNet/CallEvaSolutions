import './styles/signup.css'

import { useState } from "react"

export function SignUp(){
    const [privilege, setPrivilege] = useState("Customer")
    return (
        <div id="signuppage">
            <center>SignUp</center><br/>
            <center>
            <button onClick={()=> setPrivilege("Customer")} className={privilege==="Customer"?'logactive':""}>Customer</button>
            <button onClick={()=> setPrivilege("Provider")} className={privilege==="Provider"?'logactive':""}>Provider</button></center>
            <center>Social Media Icons</center>
            <center>Sign Up As {privilege}</center>
            <center><input placeholder='First Name'/><input placeholder='Last Name'/><br/></center>
            <center><input placeholder='Email'/><input placeholder='Contact Number'/><br/></center>
            <center><input placeholder='Password'/><input placeholder='Confirm Password'/><br/></center>
            <div><span>By signing up, you agree to CallEva Terms and Conditions</span></div>
            <button>SignUp</button><br/><br/>
            Select Login if you already have an account.
        </div>
    )
}