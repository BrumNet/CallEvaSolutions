import './styles/whychooseeva.css';
import pricing from './assets/pricing.jpg'
import expert from './assets/experts.jpg'

import equipped from './assets/equiped.webp'
import certified from './assets/certified.jpg'

export function WhyChooseEva (){
    return  <center><div className='whychooseeva'>
                <h1>Why Choose CallEva</h1>
                    
                <div className='sec'>
                    <div>
                        <center><div><img src={pricing} alt="Transparent pricing"/></div></center>
                        <h3>Transparent pricing</h3>
                        See fixed prices before you book. No hidden charges.
                    </div>
                    <div>
                    <center><div><img src={expert} alt="Experts Only"/></div></center>
                        <h3>Experts Only </h3>
                        Our professionals are well trained and have on-job expertise. 
                    </div>
                    <div>
                    <center><div><img src={equipped} alt="Fully Equipped"/></div></center>
                        <h3>Fully Equipped </h3>
                        See fixed prices before you book. No hidden charges.
                    </div>
                    <div>
                    <center><div><img src={certified} alt="100% Quality Assured"/></div></center>
                        <h3>100% Quality Assured </h3>
                        If you don’t love our service, we will make it right.
                    </div>
                </div>
            </div>
            </center>

}




