import '../App.css';
import logo from '../assets/logos/300x100.png';

const DestinationPage = () => {
  return (<>
    <div className="header">
      <img className="logo" src={logo}></img>
    </div>
    <div className="body">
      <div className="flex-container --full-width --space-below">
        <div className="text-container --center-text">
          <p className="h1">Upload</p>
        </div>
        <div className="text-container --center-text">
          <p className="h1 --white">noah_feet.png</p>
        </div>
        <div className="text-container --center-text">
          <p className="h1">to</p>
        </div>
        <div className="text-container flex-wrapper --center-text">
          <select className="select">
            <option value="GD">Google Drive</option>
            <option value="OD">OneDrive</option>
            <option value="DB">DropBox</option>
            <option value="FI">File.io</option>
            <option value="SJ">StreamJa</option>
          </select>
        </div>
      </div>
      <div className="flex-container --full-width --gap">
        <button className="cancel button --big-button --flex">- Disconnect</button>
        <button className="submit button --big-button --flex">+ Connect</button>
      </div>
    </div>
  </>)
}

export default DestinationPage;
