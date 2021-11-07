import '../App.css';
import Card from '../components/Card'
import logo from '../../../assets/logos/300x100.png';

const ConnectionPage = () => {
  return (<>
  <div className="header">
    <img src={logo}></img>
  </div>
  <div className="body">
    <Card serviceName="Google Drive"
          serviceLogo="/assets/service_logos/google_drive.png"
          serviceDescription="Accepts all file types."
          status="connected">
    </Card>
    <Card serviceName="OneDrive"
          serviceLogo="/assets/service_logos/onedrive.png"
          serviceDescription="Accepts all file types."
          status="disconnected">
    </Card>
    <Card serviceName="DropBox"
          serviceLogo="/assets/service_logos/google_drive.png"
          serviceDescription="Accepts all file types."
          status="connected">
    </Card>
    <Card serviceName="File.io"
          serviceLogo="/assets/service_logos/google_drive.png"
          serviceDescription="Accepts all file types."
          status="disconnected">
    </Card>
    <Card serviceName="Streamable"
          serviceLogo="/assets/service_logos/google_drive.png"
          serviceDescription="Accepts all file types."
          status="connected">
    </Card>
  </div>
</>)
}

export default ConnectionPage;
