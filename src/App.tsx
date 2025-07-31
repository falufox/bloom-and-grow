import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { GardenProvider } from './contexts/GardenContext';
import { WelcomeProvider, useWelcome } from './contexts/WelcomeContext';
import { WelcomeWizard } from './components/WelcomeWizard';
import { GardenGlance } from './pages/GardenGlance';
import { GardenSetup } from './pages/GardenSetup';
import { Planning } from './pages/Planning';
import { Prepping } from './pages/Prepping';
import { Planting } from './pages/Planting';
import { Cutting } from './pages/Cutting';
import { Selling } from './pages/Selling';

const AppContent: React.FC = () => {
  const { showWelcomeWizard, completeWelcome, skipWelcome } = useWelcome();

  return (
    <>
      <Router>
        <Layout>
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
          onComplete={completeWelcome}
          onSkip={skipWelcome}
        />
      )}
    </>
  );
};

function App() {
  return (
    <WelcomeProvider>
      <GardenProvider>
        <AppContent />
      </GardenProvider>
    </WelcomeProvider>
  );
}

export default App;