import './style/nav.css'
import {Menu} from './assets/menu.js'
import {Account} from './assets/account.js'
import picture from './assets/logo.png'
import { Outlet, Link } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux';
import { setadmin, setcustomer, setdefault, setprovider } from '../../redux/feature'
//import logo from ./

export function Nav() {
    return <div id="navblack"  className="navparent">
                <NavSub/><NavSmall/>
            </div>
}
export function NavW() {
    return <div id="navwhite" className="navparent">
                <NavSub/><NavSmall/>
            </div>
}

function NavSub (){
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value)
    return <div> 
            <div>
                <span>{
                user==="provider"
                ?<Link to="/account">Login As A Customer</Link>
                :<Link to="/account">Login As A Service Provider</Link>}</span> 
                <span>Categories</span>
            </div>
            <div>
                <center><Link to="/"><img src={picture} alt="logo" /></Link></center>
            </div>
            <div>
                <span>About</span> 
                <span>{user==="undefined"?<Link to="/account">Login</Link>:<Link to="/dashboard">My Account</Link>}</span>
                <span>{user==="undefined"
                ?"SignUp"
                :<Link to="/"  onClick={() => dispatch(setdefault())}>Logout</Link>}</span>
                
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
                    <button>About</button> <br/>
                    <button>{user==="undefined"?<Link to="/account">Login</Link>:<Link to="/dashboard">My Account</Link>}</button><br/>
                    <button>{user==="undefined"
                    ?"SignUp"
                    :<Link to="/"  onClick={() => dispatch(setdefault())}>Logout</Link>}</button><br/>
                    </div>
                </div>
            </div>
}