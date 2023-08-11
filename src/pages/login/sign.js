import './styles/sign.css'

import { Login } from './components/login'
import { useState } from 'react'
import { SignUp } from './components/signup';
import { Link } from 'react-router-dom';
import picture from '../common/assets/logo.png'

export function Sign ()  {
    const [log, setLog] = useState("login");
    return(
        <div id="login">
            <center>
                <div>
                    <div id="loginleft">
                        <div><button onClick={()=> {setLog("login")}} className={log === "login"?'activepage':''}>Login</button></div><br/>
                        <div><button onClick={()=> {setLog("signup")}} className={log === "signup"?'activepage':''}>SignUp</button></div>
                        <div><Link to="/"><img src={picture} alt="logo" /></Link></div>
                    </div>
                    
                    <div id="loginright">
                        {log === "signup"?<SignUp/>:<Login/>}
                    </div>
                </div>
            </center>
        </div>
    )
}