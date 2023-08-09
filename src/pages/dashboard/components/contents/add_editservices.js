import './styles/add_editservices.css'
import defaultpic from './common/assets/serviceimage.jpg'

export function AddService (){
    return <div id="addservice">
        <div className = "serviceimage">
            <div> <img src={defaultpic} alt="Profile"/></div>
        </div>

        <div>
            <br/><br/>
            <label>Service Name</label><br/>
            <input/><br/><br/><br/>
            <label>About</label><br/>
            <input id="inputabout" type='textarea'/><br/><br/><br/>
            <div>
                <div>Select Category<br/><select><option>Fashion</option></select></div>
                <div>Select SubCategory<br/><select><option>Jackets</option></select></div>
            </div>
            <br/><br/>
            <label>Price</label><br/>
            <input/><br/><br/><br/>
            <label>City</label><br/>
            <input/><br/><br/><br/>
            
            <button>Save</button>
        </div>
    </div>

}