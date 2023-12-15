import './styles/requestedservice.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Picture } from './common/picture'
import { updateRequest } from './bridge/bridge'
import { getReqServices } from './data/getReqServices'

import { sessionData } from './data/alldata'
import Cookies from 'js-cookie'
import { Cancel } from '../../assets/cancel'
import { Done } from '../../assets/done'

export function RequestedServices (){
    const user = useSelector((state) => state.user.value)
    const [data, setData] = useState({});
    const email = Cookies.get('email');

    const updateRequestStatus = async (x, id) => {
        const result = await updateRequest({status : x}, id);

        // x == "Completed" ? await updatePayment(id, bpdy) : null
    }

    const getData = async () => {

        const args =  user === "provider"?'serviceprovider':'customer'
        let getRservice = sessionData["reqservices"]

        if(!getRservice){
        const details = await getReqServices( email, args)//pass users email from redux/cached session

        sessionData["reqservices"] = details
        setData(details)
    }

    else{
        setData(sessionData["reqservices"])
    }

    }
    //TODO: if redux getStatechanged
    useEffect(() => { getData()}, []);

    return  <div>
        <div><Picture/></div>
        <center className="req_service">

        {
        data==null
        ?<></>:

        <table>
            <thead>
                <tr>
                {
                user === "provider"
                ?["","Customer", "Service", "Price", "Payment", "Status", ""].map(x => <td>{x}</td>)
                :["","Service", "Category", "Subcategory","Price", "Provider", "Status", ""].map(x => <td>{x}</td>)
                }
                </tr>
                
            </thead>
            <tbody>
                
                {  data.length === 0?
                    <tr><td colSpan={8}><center><h4>No Data Found</h4></center></td></tr>
                    : user === "provider"?
                    
                    Array.from(data).map((x, i) => <tr>
                        <td>{i + 1}.</td>
                        <td>{x["customerEmail"]}</td>
                        <td>{x["package"]}</td>

                        <td>{x["price"]}</td>
                        <td>{x["payment"]}</td>

                        <td>{x["status"]}</td>
                        {/* <td>{x["date"]}</td> */}
                        <td><button title='Revoke Service' onClick={()=>updateRequestStatus("Revoked", x["_id"])}><Cancel/></button></td>
                        </tr>
                    /**
                     Payment Status for payments
                     Status for execution of service
                     */
                    )
                    : Array.from(data).map((x, i) => <tr>
                    <td>{i + 1}.</td>
                    <td>{x["package"]}</td>
                    <td>{x["category"]}</td>

                    <td>{x["subcategory"]}</td>
                    <td>{x["price"]}</td>
                    
                    <td>{x["serviceProviderEmail"]}</td>
                    <td>{x["status"]}</td>
                    {/* <td>{x["date"]}</td> */}
                    <td><button onClick={()=>updateRequestStatus("Completed", x["_id"])} title="Click to suggest service completion"><Done/></button></td>{/**Change Pending to Rendered, Change Pending to  */}
                    </tr>
                
                )
                    
                }

                 </tbody>
        </table>
        }
            </center>
            </div>
}