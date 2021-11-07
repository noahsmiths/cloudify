import { MemoryRouter as Router } from 'react-router-dom';
import './App.css';
//import ErrorMessage from './components/ErrorMessage'
//import ConnectionPage from './pages/ConnectionPage'
//import DestinationPage from './pages/DestinationPage'
//import UploadingPage from './pages/UploadingPage'
import SharePage from './pages/SharePage'

export default function App() {
  return (
    <Router>
        {/* //needs width: 271 height: 603
          <ConnectionPage></ConnectionPage>*/}
        {/* //
          <DestinationPage></DestinationPage>*/}
        {/* //
        <UploadingPage></UploadingPage>*/}
        <SharePage></SharePage>
    </Router>
  );
}
