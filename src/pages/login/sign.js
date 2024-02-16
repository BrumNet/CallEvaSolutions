import "./styles/sign.css";


import React, { useState } from "react";

import { Link } from "react-router-dom";

import { SignUp } from "./components/signup";
import { Login } from "./components/login";

import picture from "../common/assets/logo.png";

export const Sign = () => { 

  const [log, setLog] = useState("login");
  const [signedUp, setSignedUp] = useState(false);

  function changeState(){
    setSignedUp(true);
    setLog("login");
  }

  return (
    <div id="login">
      <center>
        <div>
          <div id="loginleft">
            {
              signedUp 
              ? <>
                  Account Created! <br />
                </>
              :<></>
            }

            <div>
              <button
                onClick={() => setLog("login")}
                className={log === "login" ? "activepage" : ""}
              >
                Login
              </button>
            </div><br />

            <div>
              <button onClick={() => setLog("signup")}
                className={log === "signup" ? "activepage" : ""}
              >
                SignUp
              </button>
            </div>

            <div>
              <Link to="/"> <img src={picture} alt="logo" /> </Link>
            </div>
          </div>

          <div id="loginright">
            { 
              log === "signup" 
              ? <SignUp change={changeState} /> 
              : <Login />
            }
          </div>
        </div>
      </center>
    </div>
  );
}
