import './style/nav.css'
import {Menu} from './assets/menu.js'
import {Account} from './assets/account.js'
import picture from './assets/logo.png'
import { Link } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux';
import { setdefault } from '../../redux/feature'
import categories from '../../categories.json'
import { sessionData } from '../dashboard/components/contents/data/alldata';
import Cookies from 'js-cookie'
import { useRef, useState } from 'react';
//import logo from ./

export function Nav(props) {
    return <div id="navblack"  className="navparent">
                <NavSub pass={props.setQuery}/><NavSmall/>
            </div>
}
export function NavW(props) {
    return <div id="navwhite" className="navparent">
                <NavSub  pass={props.setQuery}/><NavSmall/>
            </div>
}

function NavSub (props){
    const dispatch = useDispatch()
    const spanRef = useRef()
    const user = useSelector((state) => state.user.value)
    const [url, setUrl] = useState("Electronics")
    const setSearch = (x) => { alert(props?.pass); spanRef.current.click()}
    return <div> 
            <div>

                <span>{
                user==="provider"
                ?<Link to="/account">Login As A Customer</Link>
                :<Link to="/account">Login As A Service Provider</Link>}</span> 
                <span>Categories<div id="cat">{Array.from(Object.keys(categories)).map((x) => <><p style={{color: "black"}} onClick={() => setSearch(x)}>{x}</p> </>)}</div></span>
                
            </div>
            <div>
                <center><Link to="/"><img src={picture} alt="logo" /></Link></center>
            </div>
            <div>
                <span>{user==="undefined"?<Link to="/account">Login / SignUp</Link>:<Link to="/dashboard">My Account</Link>}</span>
                <span>{user==="undefined"?""
                :<Link to="/"  onClick={() => {Array.from(Object.keys(sessionData)).forEach((x) => delete sessionData[x]); dispatch(setdefault()); Cookies.remove("email"); Cookies.remove("token")}}>Logout</Link>}</span>
                <span>Contact Us</span> 
                
                <Link to="/browse"><span ref={spanRef}></span></Link>
            </div>
        </div>
}

function NavSmall (){
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()
    return  <div> 
                <div><Menu/>
                <div>
                <button>{
                user==="provider"
                ?<Link to="/account">Login As A Customer</Link>
                :<Link to="/account">Login As A Service Provider</Link>}</button> <br/>
                <button>Categories</button>
                </div>
                </div>
                <div><center><Link to="/"><img src={picture} alt="logo" /></Link></center></div>
                <div><Account/>
                    <div>
                    <button>Contact Us</button> <br/>
                    <button>{user==="undefined"?<Link to="/account">Login / SignUp</Link>:<Link to="/dashboard">My Account</Link>}</button><br/>
                    {user==="undefined"
                    ?""
                    :<button><Link to="/"  onClick={() => {Array.from(Object.keys(sessionData)).forEach((x) => delete sessionData[x]); dispatch(setdefault()); Cookies.remove("email"); Cookies.remove("token")}}>Logout</Link></button>}
                    </div>
                </div>
            </div>
}