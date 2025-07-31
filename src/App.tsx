import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { GardenProvider } from './contexts/GardenContext';
import { WelcomeWizard } from './components/WelcomeWizard';
import { GardenGlance } from './pages/GardenGlance';
import { GardenSetup } from './pages/GardenSetup';
import { Planning } from './pages/Planning';
import { Prepping } from './pages/Prepping';
import { Planting } from './pages/Planting';
import { Cutting } from './pages/Cutting';
import { Selling } from './pages/Selling';

const WELCOME_STORAGE_KEY = 'bloom-and-grow-welcome-completed';

function App() {
  const [showWelcomeWizard, setShowWelcomeWizard] = useState(false);

  useEffect(() => {
    // Check if user has completed welcome wizard before
    const hasCompletedWelcome = localStorage.getItem(WELCOME_STORAGE_KEY);
    
    if (!hasCompletedWelcome) {
      // Add a small delay to ensure the app has loaded
      const timer = setTimeout(() => {
        setShowWelcomeWizard(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCompleteWelcome = () => {
    localStorage.setItem(WELCOME_STORAGE_KEY, 'true');
    setShowWelcomeWizard(false);
  };

  const handleSkipWelcome = () => {
    localStorage.setItem(WELCOME_STORAGE_KEY, 'skipped');
    setShowWelcomeWizard(false);
  };

  const handleShowWelcomeAgain = () => {
    setShowWelcomeWizard(true);
  };

  return (
    <GardenProvider>
      <Router>
        <Layout onShowWelcome={handleShowWelcomeAgain}>
          <Routes>
            <Route path="/" element={<GardenGlance />} />
            <Route path="/setup" element={<GardenSetup />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/prepping" element={<Prepping />} />
            <Route path="/planting" element={<Planting />} />
            <Route path="/cutting" element={<Cutting />} />
            <Route path="/selling" element={<Selling />} />
          </Routes>
        </Layout>
      </Router>
      
      {showWelcomeWizard && (
        <WelcomeWizard
          onComplete={handleCompleteWelcome}
          onSkip={handleSkipWelcome}
        />
      )}
    </GardenProvider>
  );
}

export default App;