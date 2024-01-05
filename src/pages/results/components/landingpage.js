import './styles/landingpage.css'
import { useState } from 'react'; 

import servicepic from './assets/food.jpg'
import short from 'short-uuid';

import { LocationIcon } from './assets/location';
import Cookies from 'js-cookie'

import { submitPayment, executeRequestNotification } from './bridge/submitpayment';
import {makePayment} from './bridge/makePayment' 

import { Verified } from './assets/verified';
import { useSelector } from 'react-redux'

import { sessionData } from '../../dashboard/components/contents/data/alldata.js';


export function ServicePage (props){

    const [paymentPrompt, changePrompt]  = useState(false)
    const d = new Date()

    const transactionId = short.uuid();
    const user = useSelector((state) => state.user.value)

    console.log(props)
    
    const executeMomo = async ()=>{

        changePrompt(true);
        
        const body = {
            amount: props.data.price,
            currency: 'LRD',
            externalId: transactionId,//TOD0: What's external id?

            payer: {
              partyIdType: 'MSISDN',
              partyId: sessionData["profile"]?.contact || "",//TODO: replace with customer mobile number
            },

            payerMessage: 'Payment for '+ props.data.packageName,
            payeeNote: 'Payment made by '+ sessionData["profile"]?.contact,
          };

        const payload = { 
            "requestNumber": sessionData["profile"]?.contact || "", //customer.mobile
             "customerEmail": Cookies.get('email'), 
             "serviceProviderEmail":  props.data.providerEmail,
//TODO: Generate UUID
             "paymentsFor": props.data.packageName, 
             "transactionID": transactionId, 
             "amount": props.data.price,

             "type": "Mobile Money",
             "status": "Outstanding",
             "statusDate" : d.toUTCString()
             }

             await makePayment(body).then(
                async ()=>{
                const result = await submitPayment(payload)
                if (result?.code === 201) return executeRequest();
                }
             );
            
    }

    const executeRequest = async ()=>{
        //if(user !== "customer") return alert("Kindly Sign In As A Customer")

        const payload = { 
        "_id": transactionId,
        "requestNumber": sessionData["profile"]?.contact  || "", 
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
            if (result?.code === 201) alert("Service Provider Will Reach Out to You soon")//replace with a page or prompt
    }
    
    return  <>
    {
    paymentPrompt 
    ? <>
        <div id="paymentPrompt"><center>

            <h2>Payment Prompt</h2>
            <p>Payment Prompt has been sent to User XXXXXXX for the purchase of XXXX for XXX dollars. <br/><br/> Kindly Confirm when payment is received</p>

            <button onClick={()=> {changePrompt(false)}} >Cancel</button>
            <button onClick={()=> {changePrompt(false)}}>Confirm</button>
            

            <br/><br/>
            </center>
        </div>
    </>
    :<>
                <center>
                    <button id="backButton"  onClick={()=>{props.landingpage()}}>Go Back to Search Results</button>
                </center>

                <br/>
                <hr/>
                
                {user !== "customer"?
                <>
                <br/><br/><br/><br/><center>Please Login As Customer to Make A Purchase</center>
                <br/><br/><br/><br/><br/><br/>
                </>:
                <div id="servicepage">
                <div>
                    <div><img src={props.data.serviceprofilepic} alt="Service Picture"/></div>
                    
                    <br/>
                </div>
                <div>
                    <br/>
                    <LocationIcon/> | {props.data.city} {props.data.country}
                    <h3>{props.data.packageName}<Verified/></h3>  
                    <small>{props.data.category}</small><br/><br/> 
                    {/* {props.data.detail} */} 
                    {props.data?.availabity?JSON.parse(props.data?.availabity)[d.getDay()].join(" "):<></>}
                     <br/> 
                    
                    <button onClick={() => executeMomo()}>{props.data.price.substring(3)} | Momo icon</button>
                    <br/>
                    <button onClick={() => executeMomo()}>{props.data.price} | Momo icon</button>
                </div>
                <span></span>
            
            </div>
            }
    </>}</>
}