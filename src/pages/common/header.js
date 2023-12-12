import './style/nav.css'
import {Menu} from './assets/menu.js'
import {Account} from './assets/account.js'
import picture from './assets/logo.png'

import { Link } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux';
import { setdefault } from '../../redux/feature'
// import categories from '../../categories.json'

import { sessionData } from '../dashboard/components/contents/data/alldata';
import Cookies from 'js-cookie'

import { useRef, useState } from 'react';
import { Phone } from './assets/phone';
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
    const setSearch = (x) => {Cookies.set('url',x); spanRef.current.click()}

    return <div> 
            <div>

                <span>
                {
                user==="provider"
                ?<Link to="/account">Login As A Customer</Link>
                :<Link to="/account">Login As A Service Provider</Link>
                }
                </span> 
                <span><Link to="/categories">Categories</Link>
                    {/* {</div>div id="cat">{Array.from(Object.keys(categories)).map((x) => <><p style={{color: "black"}} onClick={(e) => setSearch(e.target.innerHTML)}>{x}</p> </>)}</div> */}
                    </span>
                
            </div>

            <div>
                <center><Link to="/"><img src={picture} alt="logo" /></Link></center>
            </div>

            <div>
                <span>{user==="undefined"?<Link to="/account">Login / SignUp</Link>:<Link to="/dashboard">My Account</Link>}</span>
                <span>{
                user==="undefined"?""
                :<Link to="/"  onClick={() => {Array.from(Object.keys(sessionData)).forEach((x) => delete sessionData[x]); dispatch(setdefault()); Cookies.remove("email"); Cookies.remove("token")}}>Logout</Link>}</span>
                <a href='tel:+231886144144'><span style={{color: 'orange'}}>+231 88 614 4144 <Phone/></span></a>
                
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
                <button><Link to="/categories">Categories</Link></button>
                </div>
                </div>
                <div><center><Link to="/"><img src={picture} alt="logo" /></Link></center></div>
                <div><Account/>
                    <div>
                    <button>{user==="undefined"?<Link to="/account">Login / SignUp</Link>:<Link to="/dashboard">My Account</Link>}</button><br/>
                    {user==="undefined"
                    ?""
                    :<button><Link to="/"  onClick={() => {Array.from(Object.keys(sessionData)).forEach((x) => delete sessionData[x]); dispatch(setdefault()); Cookies.remove("email"); Cookies.remove("token")}}>Logout</Link></button>}
                    </div>
                </div>
            </div>
}