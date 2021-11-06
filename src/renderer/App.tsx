import { MemoryRouter as Router } from 'react-router-dom';
import './App.css';
//import ErrorMessage from './components/ErrorMessage'
//import ConnectionPage from './pages/ConnectionPage'
import DestinationPage from './pages/DestinationPage'

export default function App() {
  return (
    <Router>
        {/* //needs width: 271 height: 603
          <ConnectionPage></ConnectionPage>*/}
        <DestinationPage></DestinationPage>
    </Router>
  );
}
