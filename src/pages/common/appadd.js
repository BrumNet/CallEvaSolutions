import './style/appadd.css';
import phone from './assets/app.jpg'
import playstore from './assets/playstore.jpg'
import appstore from './assets/appstore.jpg'

export function AppAdd(){
return  <div className='appadd'>
            <center>
                <div id="applink">
                    <div><img src={playstore} alt="Get App On Play Store"/><img src={appstore} alt="Get App On App Store"/></div>
                </div>
            </center>
            <center>
                <div id="phoneimage">
                    <img src={phone} alt="Calleva App"/>
                </div>
            </center>
            <center><h4>Get the CallEva App</h4></center>
        </div>

}