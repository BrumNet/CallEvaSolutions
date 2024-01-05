import './styles/results.css'

import browsepic from './assets/cleaning.jpg'
import Cookies from 'js-cookie'

import { useEffect, useState, useRef } from 'react'
import { getResults } from './data/getResults'

import { LocationIcon } from './assets/location';
import { SearchIcon } from './assets/searchicon'; 

import './styles/landingpage.css' 

import short from 'short-uuid';

import { submitPayment, executeRequestNotification } from './bridge/submitpayment';
import {makePayment} from './bridge/makePayment' 

import { Verified } from './assets/verified';
import { useSelector } from 'react-redux'

import { sessionData } from '../../dashboard/components/contents/data/alldata.js';
import { Cart } from './assets/buy'


//get search results from cache
export function Result (props){ 

    var searchRef = useRef(null);  
    var locationRef = useRef(null);   

    const [paymentPrompt, changePrompt]  = useState(false)
    const d = new Date()

    const [prompt, setPrompt] = useState(false)
    
    const [data, setData] = useState({});
    const [xdata, setXData] = useState({});

    const transactionId = short.uuid();
    const user = useSelector((state) => state.user.value)

    console.log(props)
    
    const executeMomo = async ()=>{

        changePrompt(true);
        
        const body = {
            amount:  xdata.price,
            currency: 'LRD',
            externalId: transactionId,//TOD0: What's external id?

            payer: {
              partyIdType: 'MSISDN',
              partyId: sessionData["profile"]?.contact || "",//TODO: replace with customer mobile number
            },

            payerMessage: 'Payment for '+  xdata.packageName,
            payeeNote: 'Payment made by '+ sessionData["profile"]?.contact,
          };

        const payload = { 
            "requestNumber": sessionData["profile"]?.contact || "", //customer.mobile
             "customerEmail": Cookies.get('email'), 
             "serviceProviderEmail":   xdata.providerEmail,
//TODO: Generate UUID
             "paymentsFor":  xdata.packageName, 
             "transactionID": transactionId, 
             "amount":  xdata.price,

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

        "category":  xdata.category, 
        "subcategory":  xdata.subCategory, 
        "package":  xdata.packageName, 

        "price": xdata.price, 
        "serviceProviderEmail":  xdata.providerEmail, 
        "time": "14:32", //DateTime remove

        "status": "Pending", 
        "payment": "MTN Momo",
        "date": d.toUTCString()
    }
            const result = await executeRequestNotification(payload)
            if (result?.code === 201) alert("Service Provider Will Reach Out to You soon")//replace with a page or prompt
    }


    const getData = async () => {
        const details = await getResults() 
        let detailsFilter = details

        //From Category page
        if(Cookies.get("category")?.length > 1) 
        {
            detailsFilter = details?.filter(x => x["category"] === Cookies.get("category")) 
            return setData(detailsFilter)
        }

        //from results filtering
        if(locationRef.current.value !== "" && details.length > 0) detailsFilter = details?.filter(x => x["city"] === locationRef.current.value)
        
        if(searchRef.current.value !== "") 
                detailsFilter = detailsFilter?.filter(x => JSON.stringify(x).includes(searchRef.current.value))
         
        return setData(detailsFilter)
    }
    
    useEffect(() => {
        
    if(Cookies.get("query")) {
    searchRef.current.defaultValue = Cookies.get("query").split("|")[1] || ""
    
    const locRefOpt = Array.from(locationRef.current.options)
    
    const locToSelect = locRefOpt.find(item => item.text === Cookies.get("query").split("|")[0])

    locToSelect.selected = true
    }
    getData()
}, []); 
    const arr = Array.from(data)


    return  <>
        <div className="search">
                 
                 <div>
                     <button><LocationIcon/></button>
                     <select ref={locationRef} name="location" id="location">{
                         ["Central Monrovia", "Sinkor","Airfield","Old Road","Congo Two","Boulevard",
                         "Paynesville ","ELWA","Marshall","Gardenersville","Barnesville","Caldwell","Brewerville"].map(x => <option>{x}</option>)
                     }
                     </select>
                     <input ref={searchRef} type='text' placeholder='Search for a Service e.g. (Salon at Home, Plumber, Refrigerator)'/>
                     <button onClick={()=> {Cookies.set("category", "");getData()}}><SearchIcon/></button>
                 </div>
                 <center></center>
              
       </div>
       {
       prompt ? <div className='modal'>
       <>
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
                    <button id="backButton"  onClick={()=> setPrompt(false)}>Close</button>
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
                    <div><img src={ xdata.serviceprofilepic} alt="Service Picture"/></div>
                    
                    <br/>
                </div>
                <div>
                    <br/>
                    <LocationIcon/> | {xdata.city} { data.country}
                    <h3>{ xdata.packageName}<Verified/></h3>  
                    <small>{ xdata.category}</small><br/><br/> 
                    {/* { data.detail} */} 
                    { xdata?.availabity?JSON.parse( xdata?.availabity)[d.getDay()].join(" "):<></>}
                     <br/> 
                    
                    <button onClick={() => executeMomo()}><Cart/> LRD { xdata.price.substring(3)}</button> 
                    <br/>
                    <button onClick={() => executeMomo()}><Cart/> USD { xdata.price.substring(3)}</button>
                </div>
                <span></span>
            
            </div>
            }
    </>}
       </>
       </div>
       :<></>
       }<div className='results'> 
              <center><h3>Services Found</h3></center>
                {
                    data.length < 1 ? <><center><br/><br/>Sorry! No Results Found</center><br/><br/><br/></>
                    : arr.map(x =>  <div>
                                            <div><img src={x.serviceprofilepic || browsepic} alt={x.packageName}/></div>
                                            {x.packageName}<br/> 
                                            
                                            <LocationIcon/>{x.city}, {x.country} 
                                            <button onClick={()=> {setXData(x);setPrompt(true)}}>Get for {x.price} </button>
                                    </div>
                    )
                } 
        </div>
       
    </>
}