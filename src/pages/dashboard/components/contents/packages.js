import './styles/packages.css'
import defaultpic from './common/assets/profile.png'
import { sessionData } from './data/alldata';
import { updateProfile } from './bridge/bridge';
import { useSelector } from 'react-redux'

export function Packages(){
 const user = useSelector((state) => state.user.value)
   let mypackage = sessionData["profile"]?.Package || "None";

   const subscribe = async (x) => {
    if(mypackage !== "None") return 
    const args = user === "provider"? '/serviceprofile/':'/customerprofile/'

    let d = new Date().toUTCString
    let update
   if(sessionData["profile"]) update = await updateProfile(sessionData["profile"]?._id, args, {Package: x, PackageDate: d})

    if(update?.code === 201) alert("Updated")
    console.log(update)
    return;
   }   
   return  <div className='packages'>
                <div>
                    <div>
                        Packages
                        <hr/>
                    </div>
                    <div> <img src={sessionData["profile"]?.profilePicture ||  defaultpic} alt="Profile"/> </div>
                </div>

                <div>
                    <div>
                        <center>
                            <h1>Basic</h1>
                            <hr/>
                            <h3>$50</h3>
                            <p>Valid for 3 months</p>
                            {mypackage === "Basic" ? <button className="active" >Active</button>: <button onClick={()=> subscribe("Basic")}> Buy </button>}
                        </center>
                    </div>
                    <div>
                        <center>
                            <h1>Gold</h1>
                            <hr/>
                            <h3>$150</h3>
                            <p>Valid for 6 months</p>
                            {mypackage === "Gold" ? <button className="active">Active</button>: <button onClick={()=> subscribe("Gold")}> Buy </button>}
                        </center>
                    </div>
                    <div>
                        <center>
                            <h1>Premium</h1>
                            <hr/>
                            <h3>$300</h3>
                            <p>Valid for 1 year</p>
                            {mypackage === "Premium" ? <button className="active">Active</button>: <button onClick={()=> subscribe("Premium")}> Buy </button>}
                        </center>
                    </div>
                </div>    
                {mypackage !== "None"?<center><small>You have a {mypackage} package running</small></center>:<center><small>No Package running</small></center>}
                <br/>
            </div>
}