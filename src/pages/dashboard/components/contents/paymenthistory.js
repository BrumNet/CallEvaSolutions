import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Picture } from './common/picture'
import { getPaymentHistory } from './data/getPaymentHistory';
import { sessionData } from './data/alldata';
import Cookies from 'js-cookie'

export function PaymentHistory(){
    const user = useSelector((state) => state.user.value)

    const [data, setData] = useState({});
    const email = Cookies.get('email');

    const getData = async () => {
        const args =  user === "provider"?'serviceprovider':'customer'
        let paymentHistory = sessionData["phistory"]
        if(!paymentHistory){
        const details = await getPaymentHistory(email,args)//pass users email from redux/cached session
        sessionData["phistory"] = details
        setData(details)
    }else{
        setData(sessionData["phistory"])
    }
    }
    //TODO: if redux getStatechanged
    useEffect(() => {
        getData()
      }, []);


    return  <div>
        <div><Picture/></div>
        <center className="req_service">
        {data==null?<></>:<table>
            <thead>
                <tr>
                {
                user === "provider"
                ?["","Customer Name","Service","Amount","Payment Type","Date"].map(x => <td>{x}</td>)
                :["","Payment For","Service Provider Name", "Amount","Type","Date"].map(x => <td>{x}</td>)
                }
                </tr>
                
            </thead>
            
            <tbody>
            {data.length === 0?
                    <tr><td colSpan={6}><center><h4>No Data Found</h4></center></td></tr>
                    : user === "provider"?
            Array.from(data).map((x, i) => <tr>
                    <td>{i + 1}.</td>
                    <td>{x["customerEmail"]}</td>
                    <td>{x["paymentsFor"]}</td>
                    <td>{x["amount"]}</td>
                    <td>{x["type"]}</td>
                    <td>{x["statusDate"]}</td>
                    </tr>) 
                    : Array.from(data).map((x, i) => <tr>
                    <td>{i + 1}.</td>
                    <td>{x["paymentsFor"]}</td>
                    <td>{x["serviceProviderEmail"]}</td>
                    <td>{x["amount"]}</td>
                    <td>{x["type"]}</td>
                    <td>{x["statusDate"]}</td>
                    </tr>
                )
                    }
            </tbody>
        </table>}
            </center>
            </div>
}