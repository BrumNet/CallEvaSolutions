import "./style/footer.css";

import React from "react";

import { Link } from "react-router-dom";

import picture from "./assets/logo.png";
import { Whatsapp } from "./assets/whatsapp";
import { Facebook } from "./assets/facebook";
import { Instagram } from "./assets/instagram";

export function Footer() {
  return (
    <div id="footer">

      <section>
        <div><Link><img src={picture} alt="logo" /></Link></div>
        <div>
          <Link><Facebook /></Link>{" "}
          <Link><Instagram /></Link>{" "}
          <Link><Whatsapp /></Link>
        </div>
      </section>

      <section>
        <div><Link>Policies</Link></div>
        <div><Link>Terms and Conditions</Link></div>
      </section>

      <section>
        <div>
          CATEGORIES<br /><br />
          <Link to="/categories">All Categories</Link><br />
        </div>

        <div>
          LOCATIONS<br /><br />
          <Link to="/browse">All Locations</Link>
        </div>

        <div>
          PAGES<br /><br />
          <Link to="/browse">About us</Link><br />
          <Link to="/browse">How it works</Link><br />
          <Link to="/browse">Terms of service</Link><br />
        </div>
      </section>

      <section>
        <div>
          <p>CallEva Solutions <br /> © <br /> Copyright @ 2023 - All Rights Reserved.</p>
          <p>Developed By{" "} <a href="#" target="blank">{" "}InfoTech Nexus{" "}</a></p>
        </div>
      </section>

    </div>
  );
}
