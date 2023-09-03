import './styles/landingpage.css'
import servicepic from './assets/food.jpg'
import { LocationIcon } from './assets/location';
import Cookies from 'js-cookie'
import { submitPayment, executeRequestNotification } from './bridge/submitpayment';
import { Verified } from './assets/verified';
import { useSelector } from 'react-redux'

export function ServicePage (props){
    const d = new Date()
    const user = useSelector((state) => state.user.value)
    const executeMomo = async ()=>{
        const payload = {
            "requestNumber": "02453987", //customer.mobile
             "customerEmail": Cookies.get('email'), 
             "serviceProviderEmail":  props.data.providerEmail,
             "paymentsFor": props.data.packageName, 
             "transactionID": "000015533222",
             "amount": props.data.price,
             "type": "Mobile Money",
             "payFor": "",
             "statusDate" : d.toUTCString()
             }
        
            const result = await submitPayment(payload)
            if (result?.code === 201) return executeRequest();
    }

    const executeRequest = async ()=>{
        if(user !== "customer") return alert("Kindly Sign In As A Customer")

        const payload = { 
        "requestNumber": "1234", 
        "customerEmail":  Cookies.get('email'), 
        "category": props.data.category, 
        "subcategory": props.data.subCategory, 
        "package": props.data.packageName, 
        "price":props.data.price, 
        "serviceProviderEmail": props.data.providerEmail, 
        "time": "14:32", //DateTime remove
        "status": "Pending", 
        "payment": "MTN Momo",
        "date": d.toUTCString()
    }
            const result = await executeRequestNotification(payload)
            if (result?.code === 201) alert("Service Provide Will Reach Out to You soon")//replace with a page.
    }

    return  <>
                <center><button id="backButton"  onClick={()=>{props.landingpage()}}>Go Back to Search Results</button>
                </center><br/>
                <hr/>
                <div id="servicepage">
                <div>
                    <div><img src={servicepic} alt="Get App On Play Store"/></div>
                    
                    <br/>
                </div>
                <div>
                    <br/>
                    <LocationIcon/> | {props.data.city} {props.data.country}
                    <h1>{props.data.packageName}</h1>
                    <Verified/>  <br/>Verified<br/><br/>
                    {props.data.detail}
                    <br/><br/>
                    {props.data?.availabity?JSON.parse(props.data?.availabity)[d.getDay()].join(" "):<></>}
                     <br/> 
                    

                    <br/>
                    <button onClick={() => executeMomo()}>${props.data.price} | Momo icon</button>
                </div>
                <span></span>
            </div>
            </>
}