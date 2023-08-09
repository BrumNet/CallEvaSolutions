import { useSelector } from 'react-redux'
import { Picture } from './common/picture'
import './styles/profile.css'

export function Profile() {
    const user = useSelector((state) => state.user.value)
    return <div id="profile">
                <Picture/>
                <div>
                    <br/><br/>
                    <label>Email</label><br/>
                    <input/><br/><br/><br/>
                    <label>Contact Number</label><br/>
                    <input/><br/><br/><br/>
                    <label>Country</label><br/>
                    <input/><br/><br/><br/>
                    <label>Address</label><br/>
                    <input/><br/><br/><br/>
                </div>

                {user === "provider"?
                <div>
                    <p>Availability</p>
                    <div>
                        <input type='checkbox'/> <label>EveryDay</label>
                    </div>
                    <br/>
                    <div> 
                        <div><input type='checkbox'/> <label>Monday</label></div>
                        <div><input type='checkbox'/> <label>Tuesday</label></div>
                        <div><input type='checkbox'/> <label>Wednesday</label></div>
                        <div><input type='checkbox'/> <label>Thursday</label></div>
                        <div><input type='checkbox'/> <label>Friday</label></div>
                    </div>
                     <br/>
                     <div>
                        <div><input type='checkbox'/> <label>Saturday</label></div>
                        <div><input type='checkbox'/> <label>Sunday</label></div>
                    </div>
                </div>:""}

                
                <button>Save</button>
           </div>
} 