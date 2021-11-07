import '../App.css';
import LoadingBar from '../components/LoadingBar'
import logo from '../../../assets/logos/300x100.png';

const UploadingPage = () => {
  return (<>
    <div className="header">
      <img className="logo" src={logo}></img>
    </div>
    <div className="body">
      <div className="flex-container --full-width --space-below">
        <LoadingBar></LoadingBar>
      </div>
      <div className="flex-container --full-width --gap">
        <button className="cancel button --big-button --flex">- Disconnect</button>
      </div>
    </div>
  </>)
}

export default UploadingPage;
