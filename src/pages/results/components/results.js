import './styles/results.css'
import browsepic from './assets/cleaning.jpg'

const arr = ["","","","","","","","","","",]
export function Result (){
    return  <div className='results'>
                <div><center>Location | Search Results</center></div>
                <div>
                    {arr.map(x => {
                        return <div>
                            <div><img src={browsepic} alt="Get App On Play Store"/></div>
                            Big Joint Foods
                            Broad Street, Liberia
                            <br/><br/>
                            $120
                        </div>
                    })}
                </div>
            </div>
}