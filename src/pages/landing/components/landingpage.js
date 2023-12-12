import './styles/landingpage.css'
import servicepic from './assets/food.jpg' 

export function ServicePage (){
    return  <div id="servicepage">
        
                <div>
                    <div><img src={servicepic} alt="Get App On Play Store"/></div>
                </div>

                <div>
                    Location | Broad Street Liberia
                    <h1>Big Joint Foods</h1>
                    Get Your Specialised Chef at a discounted Price
                    <br/><br/><br/><br/>
                    Icon | Verified<br/>

                    <br/><br/>
                    <button>$120 | Momo icon</button>
                    <br/>
                    Other Payment Options
                </div>

                <span></span>
            </div>

}