import '../App.css';
import logo from '../assets/logos/300x100.png';

const DestinationPage = () => {
  //width: 500, height: 250
  return (<>
    <div className="header">
      <img className="logo" src={logo}></img>
    </div>
    <div className="body">
      <div className="flex-container --full-width">
        <div className="text-container --center-text">
          <p className="h1">Upload to</p>
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
    </div>
    <div className="footer --small-gap">
      <button className="cancel button --big-button">Cancel</button>
      <button className="loading button --big-button --flex">Uploading... May take a moment.</button>
    </div>
  </>)
}

export default DestinationPage;
