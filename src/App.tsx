
import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import RMSDashboardPage from '@/pages/monitor/RMSDashboardPage';
import RMSAssetListPage from '@/pages/monitor/RMSAssetListPage';
import CriticalAssetsPage from '@/pages/monitor/CriticalAssetsPage';
import IMSDashboardPage from '@/pages/monitor/IMSDashboardPage';
import NotFound from '@/pages/NotFound';
import Index from '@/pages/Index';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Index /></Layout>} />
      
      {/* Monitor Routes */}
      <Route path="/monitor">
        <Route path="rms-dashboard" element={<Layout><RMSDashboardPage /></Layout>} />
        <Route path="rms-asset-list" element={<Layout><RMSAssetListPage /></Layout>} />
        <Route path="critical-assets" element={<Layout><CriticalAssetsPage /></Layout>} />
        <Route path="critical-assets-tracking" element={<Layout><CriticalAssetsPage /></Layout>} />
        <Route path="ims-dashboard" element={<Layout><IMSDashboardPage /></Layout>} />
      </Route>
      
      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
