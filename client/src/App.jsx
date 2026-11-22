import { useState } from 'react';
import Navbar from './components/Navbar';
import StudentDashboard from './components/dashboard/StudentDashboard';
import AmbientBackground from './components/glass/AmbientBackground';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('landing');

  return (
    <>
      <AmbientBackground />
      <Navbar activeView={activeView} onViewChange={setActiveView} />

      {activeView === 'landing' ? (
        <LandingPage onViewChange={setActiveView} />
      ) : (
        <StudentDashboard onViewChange={setActiveView} />
      )}
    </>
  );
}

export default App;
