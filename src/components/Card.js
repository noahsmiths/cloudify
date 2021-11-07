import '../App.css';

const Card = (props) => {
  //const [isConnected, setConnection] = useState(props.isConnected);

  const connectService = async () => {
    switch(props.serviceName) {
      case "Google Drive":
        try {
          let googleDrive = new window.GoogleDrive('blank', window.googleDriveCredentials);
          await googleDrive.login();
          props.setServicesRef({
            ...props.servicesRef,
            googleDrive: true
          });
          //setConnection(true);
        } catch (err) {
          //Error logging in to google
          console.log(err);
        }
        break;
      case "OneDrive":
        try {
          let oneDrive = new window.OneDrive('blank', window.onedriveCredentials);
          await oneDrive.login();
          props.setServicesRef({
            ...props.servicesRef,
            oneDrive: true
          });
          //setConnection(true);
        } catch (err) {
          //Error logging in to onedrive
          console.log(err);
        }
        break;
      case "DropBox":
        try {
          let dropBox = new window.DropBox('blank', window.dropboxCredentials);
          await dropBox.login();
          props.setServicesRef({
            ...props.servicesRef,
            dropBox: true
          });
          //setConnection(true);
        } catch (err) {
          //Error logging in to dropbox
          console.log(err);
        }
        break;
    }
  }

  const disconnectService = async () => {
    switch(props.serviceName) {
      case "Google Drive":
        try {
          localStorage.removeItem('google_drive_token');
          props.setServicesRef({
            ...props.servicesRef,
            googleDrive: false
          });
          //setConnection(true);
        } catch (err) {
          //Error logging in to google
          console.log(err);
        }
        break;
      case "OneDrive":
        try {
          localStorage.removeItem('onedrive_token');
          props.setServicesRef({
            ...props.servicesRef,
            oneDrive: false
          });
          //setConnection(true);
        } catch (err) {
          //Error logging in to google
          console.log(err);
        }
        break;
      case "DropBox":
        try {
          localStorage.removeItem('dropbox_token');
          props.setServicesRef({
            ...props.servicesRef,
            dropBox: false
          });
          //setConnection(true);
        } catch (err) {
          //Error logging in to google
          console.log(err);
        }
        break;
    }
  }

  return (
      <div className="card">
        <div className="no-flex-wrapper card-img-wrapper">
          <img className="service-logo" src={props.serviceLogo}></img>
        </div>
        <div className="flex-wrapper flex-stack card-content-wrapper">
          <div className="flex-wrapper">
            <p className="h2">{props.serviceName}</p>
          </div>
          <div className="flex-wrapper">
            <p className="p">{props.serviceDescription}</p>
          </div>
          <div className="flex-wrapper">
            {props.isConnected ? <button className="cancel button --full-width" onClick={disconnectService}>- Disconnect</button> : <button className="submit button --full-width" onClick={connectService}>+ Connect</button>}
          </div>
        </div>
      </div>
  )
}

export default Card;
