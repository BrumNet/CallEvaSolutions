/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./style/nav.css";
import { Menu } from "./assets/menu.js";
import { Account } from "./assets/account.js";
import picture from "./assets/logo.png";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setdefault } from "../../redux/feature";

import { sessionData } from "../dashboard/components/contents/data/alldata";
import Cookies from "js-cookie";

import React, { useRef} from "react";
import { Phone } from "./assets/phone";
import { Cart } from "../results/components/assets/buy";

function logout (){
  
    const dispatch = useDispatch();

    Array.from(Object.keys(sessionData)).forEach(x => delete sessionData[x]);
    
    dispatch(setdefault());

    Cookies.remove("email");
    Cookies.remove("token");
}

const Nav = (props) => {
  return (
    <div id="navblack" className="navparent">
      <NavSub pass={props.setQuery} />
      <NavSmall />
    </div>
  );
}

const NavW = (props) => {
  return (
    <div id="navwhite" className="navparent">
      <NavSub pass={props.setQuery} />
      <NavSmall />
    </div>
  );
}

const NavSub = () => {
  const spanRef = useRef();

  const user = useSelector((state) => state.user.value);

  return (
    <div>
      <div>
        <span>
          {
            sessionData?.profile?.name.length > 1 ? "Hello! "+sessionData?.profile?.name?.split(" ")[0] : "Welcome!"
          }
        </span>
        
        <span>
          <Link to="/categories">Categories</Link>
        </span>

        <span>
          <Link to="/cart">My Cart</Link>
        </span>
      </div>

      <div>
        <center>
          <Link to="/"><img src={picture} alt="logo" /></Link>
        </center>
      </div>

      <div>
        <span>
          {
            user === "undefined" 
            ? <Link to="/account">Login / SignUp</Link>
            : <Link to="/dashboard">My Account</Link>
          }
        </span>

        <span>
          {
            user === "undefined" ? ""
            : <Link to="/" onClick={() => logout()}>Logout</Link>
          }
        </span>

        <a href="tel:+231886144144">
          <span style={{ color: "orange" }}>+231 88 614 4144 <Phone /></span>
        </a>

        <Link to="/browse"><span ref={spanRef}></span></Link>

      </div>
    </div>
  );
}

const NavSmall = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <div>
      <div>
        <Menu />

        <div>
          <button>
            {
              user === "provider" 
              ? <Link to="/account">Login As A Customer</Link>
              : <Link to="/account">Login As A Service Provider</Link>
            }
          </button>{" "}<br />

          <button><Link to="/categories">Categories</Link></button>
        </div>
      </div>

      <div>
        <center>
          <Link to="/"> <img src={picture} alt="logo" /></Link>
        </center>
      </div>

      <div>
        <Cart/>
        <Account />
        <div>
          <button>
            {
              user === "undefined" 
              ? <Link to="/account">Login / SignUp</Link>
              : <Link to="/dashboard">My Account</Link>
            }
          </button><br />

          {
            user === "undefined" ?""
            :(
                <button>
                  <Link to="/" onClick={() => logout()}>
                    Logout
                  </Link>
                </button>
             )
          }
        </div>
      </div>
    </div>
  );
}

export {Nav, NavW}