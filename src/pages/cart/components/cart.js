import React, {useState} from "react";

import { useSelector } from "react-redux";

import './styles/cart.css'

import short from "short-uuid";

import { Cart } from "../../results/components/assets/buy";

import Cookies from "js-cookie";

import convertCurrency from "../../fxns/convertcurrency";

import {submitPayment, executeRequestNotification} from "../bridge/submitpayment";
import { makePayment } from "../bridge/makePayment"; 

import { sessionData } from "../../dashboard/components/contents/data/alldata";

import { cartItems } from "./data/cartitems";

export const CartComp = () => {
/**
 * 
                    setXData(x);
                    setPrice(x.price)
                    setPrompt(true);
 */

  const user = useSelector((state) => state.user.value);

  const d = new Date();

 const transactionId = short.uuid();
 
  const [paymentPrompt, changePrompt] = useState(false);
  const [curr, setCurr] = useState("USD")
  const [cart, changeCart] = useState(Array.from(Object.values(cartItems)).length || 0)

  const xdata = {};
  const prices = [0]
  const price = "";//CONVERT

    const PaymentTypes = () => 
    <>
    <br/>
    

    {user !== "customer" ? (
      <>
        <br />
        <center>Please Login As Customer to Make A Purchase</center>
        <br />
        <br />
        <br />
      </>
    ) : (
      <div id="make_payments">
        <h4>Cart Items: {cart}</h4>
        <div className="cart_items"> 
            {
                Array.from(Object.values(cartItems)).map(
                    (x, i)  => {
                    prices[i] =  +convertCurrency(x.price, curr).substring(3)
                    return (
                        <>
                            <span>{i + 1}) {x.packageName}</span> 
                            <span> {convertCurrency(x.price, curr)}</span>
                            <span onClick={() => {removeFromCart(x._id)}}><u>Remove</u></span>
                        </>
                    )
                }
                )
            }
        </div>
        <div>
          <small>Amount Due (Total): {curr + " " +prices.reduce((x,y) => x + y)}</small> 
          <br />
          <center> 
            <button>
                <Cart /> Pay with Wallet
            </button> 
            <button onClick={() => {payByMomo()}}>
                <Cart /> Pay via Momo
            </button> 
            <button onClick={() => payOnDelivery()}>
                <Cart /> Payment on Delivery
            </button>
          </center>
        </div>
        <span></span>
      </div>
    )}
  </>

    const CurrencyComp = () => <center id="choose_currency">
          <small>Currency: </small>
          <button className={curr === "USD" ? "active_currency":""} onClick={() => setCurr("USD")}>USD</button> 
          <button className={curr === "LRD" ? "active_currency":""} onClick={() => setCurr("LRD")}>LRD</button>
        </center>

    const PaymentPrompt = () => 
    <>
    <div id="paymentPrompt">
          <center>
            <h2>Payment Prompt</h2>
            <p>
              Payment Prompt has been sent to User XXXXXXX for the
              purchase of XXXX for XXX dollars. <br />
              <br /> Kindly Confirm when payment is received
            </p>

            <button
              onClick={() => {
                changePrompt(false);
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                changePrompt(false);
              }}
            >
              Confirm
            </button>
            <br />
            <br />
          </center>
        </div>
      </>


    return (
        <div className="my_cart">
            <center><h3>My Orders</h3></center>
            <br/>
            <CurrencyComp/>
            <br/>
            {
                Array.from(Object.keys(cartItems)).length < 1
                ?     
                    <div className="cart_orders">
                        <center> No Items In Your Cart</center>
                    </div>
                :
                    <div className="myorders"> 
                        {
                        paymentPrompt 
                        ? 
                        <PaymentPrompt/>
                        : 
                        <PaymentTypes/>
                        } 
                    </div>
        
            }
            
        </div>
    )

    async function executeMomo(){
    
        const serviceInfo = {
          amount: price.substring(3),
          currency: price.substring(0,3),
          externalId: transactionId, 
          payer: {
            partyIdType: "MSISDN",
            partyId: sessionData["profile"]?.contact || "", //TODO: replace with customer mobile number
          },
          payerMessage: "Payment for " + xdata.packageName,
          payeeNote: "Payment made by " + sessionData["profile"]?.contact,
        };
        changePrompt(true);
    
        return await makePayment(serviceInfo)
      }
    
      async function submitPaymentDetails(type){
        const customerInfo = {
          requestNumber: sessionData["profile"]?.contact || "", //customer.mobile
          customerEmail: Cookies.get("email"),
          serviceProviderEmail: xdata.providerEmail,
          paymentsFor: xdata.packageName,
          transactionID: transactionId,//TODO: Generate UUID
          amount: price,
          type: type,
          status: "Outstanding",
          statusDate: d.toUTCString(),
        };
    
        return await submitPayment(customerInfo);
      }
     
      async function submitServiceRequest(type){ 
    
        const payload = {
          _id: transactionId,
          requestNumber: sessionData["profile"]?.contact || "",
          customerEmail: Cookies.get("email"),
          category: xdata.category,
          subcategory: xdata.subCategory,
          package: xdata.packageName,
          price: price,
          serviceProviderEmail: xdata.providerEmail,
          time: "14:32", //DateTime remove
          status: "Pending",
          payment: type,
          date: d.toUTCString(),
        };
    
        return await executeRequestNotification(payload); 
      }
    
      async function payByMomo (){
        await executeMomo()
        .then(submitPaymentDetails("Mobile Money"))
        .then(submitServiceRequest("Mobile Money"))
        // eslint-disable-next-line no-unused-vars
        .catch(e => null)
      }
    
      async function payOnDelivery(){
        await submitPaymentDetails("Pay on Delivery")
        .then(submitServiceRequest("Pay on Delivery"))
        .catch()
      }
    async function removeFromCart(id){
        delete cartItems[id]
        changeCart(cart - 1)
      }
    
}