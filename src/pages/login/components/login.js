import {useRef, useState} from 'react';
import { useDispatch } from 'react-redux'
import { setcustomer, setprovider } from '../../../redux/feature'
import './styles/login.css'
import { login } from '../bridge/bridge'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import { sessionData } from '../../dashboard/components/contents/data/alldata';



export function Login (){
    const dispatch = useDispatch();
    const emailRef = useRef(null);
    const pwdRef = useRef(null);
    const linkRef = useRef(null)
    const loginForm = {}
    const [error, setError] = useState("")

    const result = async () => {
        if(emailRef.current.value.length < 1) return setError('all'); 
        const validateEmail = (email) => {
            const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (email.match(emailReg)) return true;
        } 
        if(!validateEmail(emailRef.current.value)) return setError('email'); 
        if(pwdRef.current.value.length < 6) return setError('pwd'); 

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
            linkRef.current.click()
        }
        if(user?.code == 404) setError("loginErr")
        else setError('try')
    }
    return (
        <div id="loginpage">
            <br/>
            <center>Login</center><br/><br/>
            {/*<center>Social Media Icons</center>*/}
            {error === "all"?<p>All inputs are required</p>:<></>}
            {error === "email"?<p>Kindly Check Your Email</p>:<></>}
            <input ref={emailRef} type="email" placeholder='Email Address'/><br/>
            <input ref={pwdRef} type="password" placeholder='Password'/><br/>
            {error === "pwd"?<p>Password Must Have At Least 6 characters</p>:<></>}
            <div>{/*<span>Remember Me</span>*/}<span>Forgot Password?</span></div>
            <button onClick={() => result() }>Login</button>
            {error === "try"?<p><br/>An Error Occured.<br/><br/>Try Again In A Few Minutes <br/> or Contact Administrator</p>:<></>}
            {error === "loginErr"?<p><br/>Username / Password Incorrect</p>:<></>}
            <Link to="/dashboard" ref={linkRef}><span></span></Link>
            <br/>
        </div>// to="/dashboard"
    )
}
//<input type='checkbox'/>