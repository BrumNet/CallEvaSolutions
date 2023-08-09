import './style/footer.css'
import picture from './assets/logo.png'

export function Footer (){
    return  <div id="footer">
                <section>
                    <div><img src={picture} alt="logo" /></div>
                    <div>Social Media Section</div>
                </section>
                <section>
                    <div>Policies</div>
                    <div>Terms and Conditions</div>
                </section>
                <section>
                    <div>
                        Pages<br/><br/>
                        About us<br/>
                        How it works<br/>
                        Privacy policy<br/>
                        Terms of service<br/>
                        Press & News<br/>
                        Contact us<br/>
                        Trust & safety<br/>
                        Thank You<br/>
                        FAQ<br/>
                    </div>
                    <div>
                        Popular Categories<br/><br/>
                        Electricians<br/>
                        Painting<br/>
                        Car Repair<br/>
                        Cleaning<br/>
                        AC Repair<br/>
                        Website Development<br/>
                        Carpenter<br/>
                        Car Rental Service<br/>
                        All Services<br/>
                    </div>
                    <div>
                        Locations<br/><br/>
                        Broad Street<br/>
                        Duport Road<br/>
                        Fiamah<br/>
                        New Matadi Estate<br/>
                        New York<br/>
                        Old Matadi Estate<br/>
                        Old Road<br/>
                        Paynesville<br/>
                        Sinkor<br/>
                    </div>
                </section>
                <section>
                    <div>
                        <p>© Copyright @ 2023 | Developed by - <a href="http://www.victorthesaiyan.xyz" target='blank'>victorthesaiyan.xyz</a>. All Rights Reserved.</p>
                    </div>
                </section>
            </div>
}