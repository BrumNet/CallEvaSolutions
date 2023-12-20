import {useRef, useState} from 'react';
import { useDispatch } from 'react-redux'

import { setcustomer, setprovider } from '../../../redux/feature'
import './styles/login.css'
import { login, forgotPassword, changePassword } from '../bridge/bridge'
import { Link } from 'react-router-dom';

import Cookies from 'js-cookie'
import { sessionData } from '../../dashboard/components/contents/data/alldata';
import { GoBack } from '../../common/assets/arrrowback';

export function Login (){

    const dispatch = useDispatch();
    const emailRef = useRef(null);
    const pwdRef = useRef(null);

    const forgotPasswordEmailRef = useRef(null);
    const codeRef = useRef(null);
    const linkRef = useRef(null)

    const newpwdRef = useRef(null);
    const connewpwdRef = useRef(null);

    const updateCode = {}

    const loginForm = {}
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [forgotEmail, setForgotEmail] = useState(false)
    const [emailCheck, setEmailCheck] = useState(false)

    const validateEmail = (email) => {
            const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (email.match(emailReg)) return true;

        } 
    const result = async () => {

        if(emailRef.current.value.length < 1) return setError('all'); 

        
        
        if(!validateEmail(emailRef.current.value)) return setError('email'); 
        if(pwdRef.current.value.length < 6) return setError('pwd'); 
        setError('login'); 
        //console.log(emailRef.current.value)

        loginForm.email = emailRef.current.value
        loginForm.password = pwdRef.current.value

        const user = await login(loginForm)
        console.log(user)

        if(user?.privilege){

            Array.from(Object.keys(sessionData)).forEach((x) => delete sessionData[x])
            sessionData = {}

            if(user.privilege === "customer") dispatch(setcustomer())
            if(user.privilege === "provider") dispatch(setprovider())

            Cookies.set('token', user.token)
            Cookies.set('email', user.user)
            return linkRef.current.click()
        }
        if(user?.code == 404) return setError("loginErr")
        else return setError('try')
    }
    return (
            !forgotEmail ? <div id="loginpage">
            <br/>
            <center>Login</center><br/><br/>

            {/*<center>Social Media Icons</center>*/}
            
            {error === "pwdchkd"?<p>Success! Kindly Login</p>:<></>}
            {error === "all"?<p>All inputs are required</p>:<></>}
            {error === "email"?<span>Kindly Check Your Email</span>:<></>}
            <input ref={emailRef} type="email" placeholder='Email Address'/><br/>
            <input ref={pwdRef} type="password" placeholder='Password'/><br/>

            {error === "pwd"?<p>Password Must Have At Least 6 characters</p>:<></>}
            <div>{/*<span>Remember Me</span>*/}<small><a onClick={() => setForgotEmail(true)}>Forgot Password?</a></small></div>
            <button onClick={() => result() }>Login</button>
            
            {error === "try"?<p><br/>An Error Occured.<br/><br/>Try Again In A Few Minutes <br/> or Contact Administrator</p>:<></>}
            {error === "loginErr"?<p><br/>Username / Password Incorrect</p>:<></>}
            {error === "login"?<p><br/>Logging In...</p>:<></>}

            <Link to="/dashboard" ref={linkRef}><span></span></Link>
            <br/>
        </div>// to="/dashboard"
        :
        <div id="forgotPassword">
            <br/>
            <center>Forgot Password</center><br/> 
            {/*<center>Social Media Icons</center>*/}
            <div onClick={() => {setEmailCheck(false) ; setForgotEmail(false); setError("")}}><GoBack/></div> <br/>
            
            {error === "all"?<p>All inputs are required</p>:<></>}
            {
            !emailCheck 
            ? <>
            {error === "email"?<p>Incorrect Email</p>:<></>}
            {error === "loginErr"?<p><br/>Email Doesn't Exist</p>:<></>}
            {error === "login"?<p><br/>Checking Email...</p>:<></>}

            <input ref={forgotPasswordEmailRef} type="email" placeholder='Email Address'/><br/><br/>
            <small>A Code will be sent to your email </small><br/><br/>

            <button  onClick={
            async () => { 
                setError("login")
            if(forgotPasswordEmailRef.current.value === "" || !validateEmail(forgotPasswordEmailRef.current.value))
             {setError('email')}
             else {
                var response = await forgotPassword({"email": forgotPasswordEmailRef.current.value})
                console.log(response)
                if(response?.code === 200) { setEmail(forgotPasswordEmailRef.current.value); return setEmailCheck(true)}
                else setError('loginErr')
            }
            }

             }>Submit</button>{/**Check if emailexists in database */}
            <br/> <br/>
            </>
            :
            <div id="updatepassword">  
            {error === "pwdErr"?<p>An Error Occurred.<br/></p>:<></>}
            {error === "pwdErrcode"?<p>Code Incorrect.<br/></p>:<></>}
            {error === "update"?<p>Updating...<br/></p>:<></>}
            {error == "pwdmsmatch"?<p>Password Doesn't Match!<br/></p>:<></>}

            <br/>
            <input ref={codeRef} type="text" placeholder='Enter Code'/><br/><br/>
            <small>Kindly Check Your Email For Access Code </small><br/><br/>
            <input ref={newpwdRef} type="password" placeholder='New Password'/><br/><br/>
            <input ref={connewpwdRef} type="password" placeholder='Confirm New Password'/><br/><br/>
            <br/><br/>
            <button
            onClick={async () => {
                if(codeRef.current.value === "" || newpwdRef.current.value === "" || connewpwdRef.current.value === "")
                return setError("all")

                if(newpwdRef.current.value !== connewpwdRef.current.value)
                return setError("pwdmsmatch")
                
                setError('update')
                updateCode.email = email
                updateCode.password = newpwdRef.current.value
                updateCode.code = codeRef.current.value
                console.log(updateCode)
                var response = await changePassword(updateCode)
                console.log(response)

                if(response?.code === 200) { 
                    setEmailCheck(false) ; 
                    setForgotEmail(false); 
                    setError("pwdchkd")
                }
                else if(response?.message.includes("Code"))
                    {
                      setError('pwdErrcode')
                    }
                else setError('pwdErr')

            }}>Submit</button>
            <br/><br/>
            <br/>
            </div>}
        </div>
    )
}
//<input type='checkbox'/>