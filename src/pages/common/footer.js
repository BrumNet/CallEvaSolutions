import './style/footer.css'
import { Link } from 'react-router-dom'
import picture from './assets/logo.png'
import { Whatsapp } from './assets/whatsapp'
import { Facebook } from './assets/facebook'
import { Instagram } from './assets/instagram'
import Cookies from 'js-cookie'
import { Category } from '../categories/components/category'

export function Footer (){
    return  <div id="footer">
                <section>
                    <div>
                        <Link>
                            <img src={picture} alt="logo"/>
                        </Link>
                    </div>
                    <div><Link><Facebook/></Link>   <Link><Instagram/></Link>   <Link><Whatsapp/></Link></div>
                </section>
                <section>
                    <div><Link>Policies</Link></div>
                    <div><Link>Terms and Conditions</Link></div>
                </section>
                <section>
                    <div>
                        CATEGORIES<br/><br/>
 
                        {
                        // !Cookies.get("category") || Cookies.get(Category) === ""
                        // ?
                        // <><Link to="/categories">Real Estate Booking</Link><br/>
                        // <Link to="/categories">Car Rental Services</Link> <br/>
                        // <Link to="/categories"><Link to="/browse" onClick={() => Cookies.set("category", "")}>Delivery Services</Link></Link><br/>
                        // <Link to="/browse?category=Plumber">Plumber </Link><br/>
                        // <Link to="/browse?category=Electrician">Electrician</Link><br/>
                        // <Link to="/browse?category=Contractor">Contractor</Link> <br/>
                        // <Link to="/browse?category=Architect">Architect</Link><br/>
                        // <Link to="/browse?category=Painter">Painter</Link><br/>
                        // <Link to="/browse?category=Mechanic">Mechanic</Link><br/>
                        // <Link to="/browse?category=House Keeping Services">House Keeping Services</Link> <br/>
                        // <Link to="/browse?category=Security Services">Security Services</Link> <br/>
                        // <Link to="/browse?category=Roof Repair Services">Roof Repair Services</Link><br/>
                        // <Link to="/browse?category=AC Repair">AC Repair</Link><br/>
                        // <Link to="/browse?category=">Gardener</Link> <br/>
                        // <Link to="/browse?category=Gardener">Website Development</Link><br/>
                        // <Link to="/browse" onClick={() => Cookies.set("category", "Carpenter")}>Carpenter</Link><br/>
                        // </>
                        // : 
                        <><Link to="/categories">All Categories</Link><br/></>
                        }
                    </div>
                    <div>
                        LOCATIONS<br/><br/>
                        {/* {
                         ["Central Monrovia","Sinkor" ,
                         "Airfield" ,"Old Road" ,
                         "Congo Two" ,"Boulevard ",
                         "Paynesville" ,"ELWA" ,
                         "Marshall" ,"Gardenersville" ,
                         "Barnesville" ,"Caldwell" ,
                         "Brewerville"].map(x => <><Link to={'/browse?location='+x}>{x}</Link><br /></>)} */}
                         
                         <Link to="/browse">All Locations</Link>
                    </div>
                    <div>
                        PAGES<br/><br/>
                        <Link to="/browse">About us</Link><br/>
                        <Link to="/browse">How it works</Link><br/>
                        {/* <Link to="/browse">Privacy policy</Link><br/> */}
                        <Link to="/browse">Terms of service</Link><br/>
                        {/* <Link to="/browse">Press & News</Link><br/> */}
                        {/* <Link to="tel:+231886144144">Contact us</Link><br/> */}
                        {/* <Link to="/browse">Trust & safety</Link><br/> */}
                        {/* <Link to="/browse">Thank You</Link><br/> */}
                        {/* <Link to="/browse">FAQ</Link><br/> */}
                    </div>
                </section>
                <section>
                    <div>
                        <p>CallEva Solutions <br/> © <br/> Copyright @ 2023 - All Rights Reserved.</p>
                        <p>Developed By <a href="#" target='blank'> InfoTech Nexus </a></p>
                    </div>
                </section>
            </div>
}