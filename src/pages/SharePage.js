import '../App.css';
import logo from '../assets/logos/300x100.png';

const SharePage = () => {
  return (<>
    <div className="header">
      <img className="logo" src={logo}></img>
    </div>
    <div className="body">
      <div className="flex-wrapper --center-items">
        <p className="h1 --white --bold --center-text">Success!</p>
      </div>
      <div className="flex-wrapper --space-below --center-items">
        <p className="h2 --center-text">File has successfully uploaded.</p>
      </div>
    </div>
    <div className="footer">
      <div className="flex-wrapper">
        <input className="input --full-width" value="Link"></input>
      </div>
      <div>
        <button className="neutral button --big-button">Copy Link</button>
      </div>
    </div>
  </>)
}

export default SharePage;
