import './styles/packages.css'
import defaultpic from './common/assets/profile.png'

export function Packages(){
    return  <div className='packages'>
                <div>
                    <div>
                        Packages
                        <hr/>
                    </div>
                    <div> <img src={defaultpic} alt="Profile"/> </div>
                </div>

                <div>
                    <div>
                        <center>
                            <h1>Basic</h1>
                            <hr/>
                            <h3>$50</h3>
                            <p>Valid for 3 months</p>
                            <button>Buy</button>
                        </center>
                    </div>
                    <div>
                        <center>
                            <h1>Gold</h1>
                            <hr/>
                            <h3>$150</h3>
                            <p>Valid for 6 months</p>
                            <button>Buy</button>
                        </center>
                    </div>
                    <div>
                        <center>
                            <h1>Premium</h1>
                            <hr/>
                            <h3>$300</h3>
                            <p>Valid for 1 year</p>
                            <button>Buy</button>
                        </center>
                    </div>
                </div>    
            </div>
}