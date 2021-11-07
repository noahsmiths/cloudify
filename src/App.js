import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import ErrorMessage from './components/ErrorMessage'
import ConnectionPage from './pages/ConnectionPage'
import DestinationPage from './pages/DestinationPage'
import SharePage from './pages/SharePage'

export default function App() {
  const [sharedState, setSharedState] = useState();

  return (
      <Router>
        <Routes>
          <Route path="/" element={<ConnectionPage sharedState={sharedState} setSharedState={setSharedState} />} />
          <Route path="/destination" element={<DestinationPage sharedState={sharedState} setSharedState={setSharedState} />} />
          <Route path="/share" element={<SharePage sharedState={sharedState} setSharedState={setSharedState} />} />
          <Route path="/error" element={<ErrorMessage message={sharedState} setSharedState={setSharedState} />} />
        </Routes>
      </Router>
  );
}
