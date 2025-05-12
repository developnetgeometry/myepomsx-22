
import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import RMSDashboardPage from '@/pages/monitor/RMSDashboardPage';
import RMSAssetListPage from '@/pages/monitor/RMSAssetListPage';
import CriticalAssetsTrackingPage from '@/pages/monitor/CriticalAssetsTrackingPage';
import IMSDashboardPage from '@/pages/monitor/IMSDashboardPage';
import NotFound from '@/pages/NotFound';
import Index from '@/pages/Index';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Index /></Layout>} />
      
      {/* Monitor Routes */}
      <Route path="/monitor/rms-dashboard" element={<Layout><RMSDashboardPage /></Layout>} />
      <Route path="/monitor/rms-asset-list" element={<Layout><RMSAssetListPage /></Layout>} />
      <Route path="/monitor/critical-assets-tracking" element={<Layout><CriticalAssetsTrackingPage /></Layout>} />
      <Route path="/monitor/ims-dashboard" element={<Layout><IMSDashboardPage /></Layout>} />
      
      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
