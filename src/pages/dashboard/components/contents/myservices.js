import { Picture } from './common/picture'
import { useEffect, useState } from 'react'

import { getServices } from './data/getServices';
import { sessionData } from './data/alldata';
import Cookies from 'js-cookie'

export function MyServices(props){

    const [xdata, setData] = useState({});
    const email = Cookies.get('email');    

    const getData = async () => {
        let getMyServices = sessionData["MyServices"]

        if(!getMyServices) {
            const details = await getServices(email)
            sessionData["MyServices"] = details
            //Cookies.set("myservices" , JSON.stringify(details))
            setData(details)
        }

        else{
            setData(sessionData["MyServices"])
        }   

    }
    //TODO: if redux getStatechanged
    useEffect(() => { getData() },[] );

    return  <div>
        <div><Picture/></div>
        <center className="req_service">
        {
        xdata==null
        ?<></>
        :<table>
            <thead>
                <tr>
                {
                ["","Service","Category","Sub Category","Price","City","Actions"].map(x => <td>{x}</td>)
                }
                </tr>
                
            </thead>
            
            <tbody>
                {
                    xdata.length === 0?
                    <tr><td colSpan={6}><center><h4>No Data Found</h4></center></td></tr>
                    : Array.from(xdata).map((x,i) => <tr>
                        <td>{i + 1}. </td>
                        <td>{x["packageName"]}</td>
                        <td>{x["category"]}</td>
                        <td>{x["subCategory"]}</td>
                        <td>{x["price"]}</td>
                        <td>{x["city"]}</td>
                        <td><button onClick={()=> props.change(x)}>Edit</button><button id={"delete"+x["_id"]}>Delete</button></td>
                    </tr>
                    /**,"providerEmail":"info@lenovo.com","packageName":"Computing","category":"Electronics","subCategory":"Sales","time":"23:50","price":"12:30","country":"Ghana","city":"Accra */
                    )
                }
                
            </tbody>
        </table>
        }
            </center>
            </div>
}