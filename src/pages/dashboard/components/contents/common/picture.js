import defaultpic from './assets/profile.png'
import './picture.css'

export function Picture (){
    return  <center>
                <div>
                    <div id="imagecontainer">
                        <img src={defaultpic} alt="Profile"/>
                    </div>
                </div>
                <div>
                    <div id="name">
                        Odogwu Philip
                    </div>
                </div>
            </center>
}