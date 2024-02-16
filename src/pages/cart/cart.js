import React from "react";
import { Footer } from "../common/footer";
import { Nav } from "../common/header";
import { CartComp } from "./components/cart";


export const Cart = () => {
    return (
        <div>
            <Nav/>
            <CartComp/>
            <Footer/>
        </div>
    )
}