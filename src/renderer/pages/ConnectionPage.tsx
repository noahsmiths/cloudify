import { useState} from 'react';
import '../App.css';
import Card from '../components/Card'
import logo from '../../../assets/logos/300x100.png';
import gd from '../../../assets/service_logos/google_drive.png';
import od from '../../../assets/service_logos/onedrive.png';
import db from '../../../assets/service_logos/dropbox.svg';
import fi from '../../../assets/service_logos/fileio.png';
import sj from '../../../assets/service_logos/streamja.png';

const ConnectionPage = () => {
  const [services, setServices] = useState<any>(localStorage.getItem('services') ? localStorage.getItem('services') : { googleDrive: false, oneDrive: false, dropBox: false });

  /*
  connectedServices.googleDrive
  connectedServices.oneDrive
  connectedServices.dropBox
  */

  return (<>
  <div className="header">
    <img className="logo" src={logo}></img>
  </div>
  <div className="body">
    <Card serviceName="Google Drive"
          serviceLogo={gd}
          serviceDescription="Accepts all file types."
          isConnected={services?.googleDrive}
          setServiceRef={setServices}>
    </Card>
    <Card serviceName="OneDrive"
          serviceLogo={od}
          serviceDescription="Accepts all file types."
          isConnected={services?.oneDrive}
          setServiceRef={setServices}>
    </Card>
    <Card serviceName="DropBox"
          serviceLogo={db}
          serviceDescription="Accepts all file types."
          isConnected={services?.dropBox}
          setServiceRef={setServices}>
    </Card>
    <Card serviceName="File.io"
          serviceLogo={fi}
          serviceDescription="Accepts all file types."
          isConnected={true}>
    </Card>
    <Card serviceName="StreamJa"
          serviceLogo={sj}
          serviceDescription="Accepts video file types."
          isConnected={true}>
    </Card>
  </div>
</>)
}

export default ConnectionPage;
