import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { GardenProvider } from './contexts/GardenContext';
import { GardenGlance } from './pages/GardenGlance';
import { GardenSetup } from './pages/GardenSetup';
import { Planning } from './pages/Planning';
import { Prepping } from './pages/Prepping';
import { Planting } from './pages/Planting';
import { Cutting } from './pages/Cutting';
import { Selling } from './pages/Selling';

function App() {
  return (
    <GardenProvider>
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
    </GardenProvider>
  );
}

export default App;