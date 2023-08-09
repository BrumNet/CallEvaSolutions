import { useDispatch } from 'react-redux'
import { setcustomer, setprovider } from '../../../redux/feature'
import './styles/login.css'
import { Link } from "react-router-dom"


export function Login (){
    const dispatch = useDispatch();
    return (
        <div id="loginpage">
            <br/>
            <center>Login</center><br/>
            <center>Social Media Icons</center>
            <input placeholder='Email Address'/><br/>
            <input placeholder='Password'/><br/>
            <div><span>Remember Me</span><span>Forgot Password</span></div>
            <button><Link to="/dashboard" onClick={() => dispatch(setcustomer())}>Login</Link></button>
            <button onClick={() => dispatch(setprovider())}><Link to="/dashboard">Provider</Link></button>
            <br/>
        </div>
    )
}
//<input type='checkbox'/>