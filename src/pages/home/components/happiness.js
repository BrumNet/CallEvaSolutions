import './styles/happiness.css'
import happy from './assets/happy.jpg'

export function Happiness () {
    return <div className="happiness">
                <div>
                    <div></div>
                    <div><img src={happy} alt="Calleva Services - Cleaning"/></div>
                    <div></div>
                </div>
                <div>
                    <div>
                    <h1>Your Happiness,<br/> Guaranteed</h1>
                    <p>Your happiness is our goal. If you’re not <br/>

                        happy, we’ll work to make it right. Our <br/>

                        friendly customer service agents are <br/>

                        available 24 hours a day, 7 days a week. The <br/>

                        Happiness Guarantee only applies when you<br/>

                        book and pay for a service directly through<br/> 

                        the CallEva platform.
                    </p>
                    <button>Learn More...</button>
                    </div>
                </div>
           </div>
}