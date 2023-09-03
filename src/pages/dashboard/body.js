import './body.css'
import { useState, useRef } from 'react'
import {useSelector } from 'react-redux'
import { Profile } from './components/contents/profile'
import { RequestedServices } from './components/contents/requestedservices'
import Dropdown from './assets/dropdown'
//import {payment History}
//import {payment History}
import {Packages} from './components/contents/packages'
import { AddService } from './components/contents/add_editservices'
import { PaymentHistory } from './components/contents/paymenthistory'
import { MyServices } from './components/contents/myservices'
import Cookies from 'js-cookie'

export function Body () {
    //const unApproved = useRef()
    const [menu, setMenu] = useState("profile")
    const user = useSelector((state) => state.user.value)
    const getMenu = (x) => {
        return x === "profile" ? "Profile"
        : x === "requested" ? "Requested Services"
        : x === "phistory" ? "Payment History"
        : x === "services" ? "Services"
        : x === "addservice" ? "Add Service"
        : x === "packages" ? "Packages"
        : "Profile"
    }

    const [data, setData] = useState("")
    

    const setToServices = () => {
        setMenu("services");
    }

    const setToEditServices = (data) => {
        setMenu("editservice");
        setData(data)
    }

    //if(Cookies.get("email")) return unApproved.current.click()
    //<Link to ="/"><span ref={"unApproved"}></span></Link>
                    
    return  <div><div id="topbar">
             <center>
                <p>{getMenu(menu)}</p><br/><Dropdown/>
                <div>
                    <button onClick={() => setMenu("profile")} className={menu === "profile"?"active":''}>Profile</button><br/>
                    <button onClick={() => setMenu("requested")} className={menu === "requested"?"active":''}>Requested Services</button><br/>
                    <button onClick={() => setMenu("phistory")} className={menu === "phistory"?"active":''}>Payment History</button><br/>
                    {user === "provider"?<>
                    <button onClick={() => setMenu("services")} className={menu === "services"?"active":''}>Services</button><br/>
                    <button onClick={() => setMenu("addservice")} className={menu === "addservice"?"active":''}>Add New Service</button>
                    {menu === "editservice" ? <button onClick={() => setMenu("editservice")} className={menu === "editservice"?"active":''}>Edit Service</button>:<></>}<br/>
                    <button onClick={() => setMenu("packages")} className={menu === "packages"?"active":''}>Packages</button><br/>
                    </>:<></>}
                </div>
                </center>
             </div>
             <div id="body">
            
             <div id="sidebar">
                <div>
                    <button onClick={() => setMenu("profile")} className={menu === "profile"?"active":''}>Profile</button>
                    <button onClick={() => setMenu("requested")} className={menu === "requested"?"active":''}>Requested Services</button>
                    <button onClick={() => setMenu("phistory")} className={menu === "phistory"?"active":''}>Payment History</button>
                    {user === "provider"?<>
                    <button onClick={() => setMenu("services")} className={menu === "services"?"active":''}>Services</button>
                    <button onClick={() => setMenu("addservice")} className={menu === "addservice"?"active":''}>Add New Service</button>
                    {menu === "editservice" ? <button onClick={() => setMenu("editservice")} className={menu === "editservice"?"active":''}>Edit Service</button>:<></>}<br/>
                    <button onClick={() => setMenu("packages")} className={menu === "packages"?"active":''}>Packages</button>
                    </>:<></>}
                </div>
            </div>
            <div id="main">
            {(() => {
                switch(menu) {
                    case "profile": return <Profile/>;
                    case "requested": return <RequestedServices/>;
                    case "phistory": return <PaymentHistory/>;
                    case "services": return <MyServices change={setToEditServices}/>;
                    case "addservice": return <><AddService change={setToServices}/></>;
                    case "editservice": return <AddService data={data} change={setToServices}/>;
                    case "packages": return <Packages/>;
                    default: return <Profile/>
                }
                })()}
            </div>

        </div>
        </div>

}
//<Content/>