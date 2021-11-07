import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import '../App.css';
import logo from '../assets/logos/300x100.png';

const DestinationPage = (props) => {
  //width: 500, height: 250
  const services = localStorage.getItem('services') ? JSON.parse(localStorage.getItem('services')) : {};
  const [status, updateStatus] = useState("Upload");
  const serviceRef = useRef();
  const navigate = useNavigate();

  const cancel = () => {
    window.ipcRenderer.send('close');
  }

  const uploadFile = async () => {
    updateStatus("Uploading... This may take a moment.");
    let file = global.process.argv[global.process.argv.indexOf('file-passed') + 1];

    switch (serviceRef.current.value) {
      case "GD":
        try {
          let googleDrive = new window.GoogleDrive('blank', window.googleDriveCredentials);
          await googleDrive.login();
          let link = await googleDrive.uploadAndGetLink(file);
          props.setSharedState(link);
          navigate('../share');
          //setConnection(true);
        } catch (err) {
          console.log(err);
          props.setSharedState(err);
          navigate('../error');
        }
        break;
      case "OD":
        try {
          let oneDrive = new window.OneDrive('blank', window.onedriveCredentials);
          await oneDrive.login();
          let link = await oneDrive.uploadAndGetLink(file);
          props.setSharedState(link);
          navigate('../share');
          //setConnection(true);
        } catch (err) {
          console.log(err);
          props.setSharedState(err);
          navigate('../error');
        }
        break;
      case "DB":
        try {
          let dropBox = new window.DropBox('blank', window.dropboxCredentials);
          await dropBox.login();
          let link = await dropBox.uploadAndGetLink(file);
          props.setSharedState(link);
          navigate('../share');
          //setConnection(true);
        } catch (err) {
          console.log(err);
          props.setSharedState(err);
          navigate('../error');
        }
        break;
      case "FI":
        try {
          let fileIO = new window.FileIO();
          let link = await fileIO.uploadAndGetLink(file);
          props.setSharedState(link);
          navigate('../share');
          //setConnection(true);
        } catch (err) {
          console.log(err);
          props.setSharedState(err);
          navigate('../error');
        }
        break;
      case "SJ":
        try {
          let streamja = new window.Streamja();
          let link = await streamja.uploadAndGetLink(file);
          props.setSharedState(link);
          navigate('../share');
          //setConnection(true);
        } catch (err) {
          console.log(err);
          props.setSharedState(err);
          navigate('../error');
        }
        break;
    }
  }

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
          <select className="select" ref={serviceRef}>
            { services.googleDrive && <option value="GD">Google Drive</option> }
            { services.oneDrive && <option value="OD">OneDrive</option> }
            { services.dropBox && <option value="DB">DropBox</option> }
            <option value="FI">File.io</option>
            <option value="SJ">StreamJa</option>
          </select>
        </div>
      </div>
    </div>
    <div className="footer --small-gap">
      <button className="cancel button --big-button" onClick={cancel}>Cancel</button>
      <button className="loading button --big-button --flex" onClick={uploadFile}>{status}</button>
    </div>
  </>)
}

export default DestinationPage;
