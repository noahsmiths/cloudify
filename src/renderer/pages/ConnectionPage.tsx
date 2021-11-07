import '../App.css';
import Card from '../components/Card'
import logo from '../../../assets/logos/300x100.png';
import gd from '../../../assets/service_logos/google_drive.png';
import od from '../../../assets/service_logos/onedrive.png';
import db from '../../../assets/service_logos/dropbox.svg';
import fi from '../../../assets/service_logos/fileio.png';
import sj from '../../../assets/service_logos/streamja.png';

const ConnectionPage = () => {
  return (<>
  <div className="header">
    <img className="logo" src={logo}></img>
  </div>
  <div className="body">
    <Card serviceName="Google Drive"
          serviceLogo={gd}
          serviceDescription="Accepts all file types."
          status="connected">
    </Card>
    <Card serviceName="OneDrive"
          serviceLogo={od}
          serviceDescription="Accepts all file types."
          status="disconnected">
    </Card>
    <Card serviceName="DropBox"
          serviceLogo={db}
          serviceDescription="Accepts all file types."
          status="connected">
    </Card>
    <Card serviceName="File.io"
          serviceLogo={fi}
          serviceDescription="Accepts all file types."
          status="disconnected">
    </Card>
    <Card serviceName="StreamJa"
          serviceLogo={sj}
          serviceDescription="Accepts all file types."
          status="connected">
    </Card>
  </div>
</>)
}

export default ConnectionPage;
