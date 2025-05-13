
import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import RMSDashboardPage from '@/pages/monitor/RMSDashboardPage';
import RMSAssetListPage from '@/pages/monitor/RMSAssetListPage';
import RMSAssetDetailPage from '@/pages/monitor/RMSAssetDetailPage';
import CriticalAssetsPage from '@/pages/monitor/CriticalAssetsPage';
import IMSDashboardPage from '@/pages/monitor/IMSDashboardPage';
import NotFound from '@/pages/NotFound';
import Index from '@/pages/Index';
import WOHistoryPage from '@/pages/maintain/WOHistoryPage';
import WOHistoryDetailPage from '@/pages/maintain/WOHistoryDetailPage';
import AssetRegisterPage from '@/pages/manage/AssetRegisterPage';
import DashboardPage from '@/pages/DashboardPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Index /></Layout>} />
      <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
      
      {/* Monitor Routes */}
      <Route path="/monitor/rms-dashboard" element={<Layout><RMSDashboardPage /></Layout>} />
      <Route path="/monitor/rms-asset-list" element={<Layout><RMSAssetListPage /></Layout>} />
      <Route path="/monitor/rms-asset-detail/:id" element={<Layout><RMSAssetDetailPage /></Layout>} />
      <Route path="/monitor/critical-assets" element={<Layout><CriticalAssetsPage /></Layout>} />
      <Route path="/monitor/critical-assets-tracking" element={<Layout><CriticalAssetsPage /></Layout>} />
      <Route path="/monitor/ims-dashboard" element={<Layout><IMSDashboardPage /></Layout>} />
      
      {/* Maintain Routes */}
      <Route path="/maintain/wo-history" element={<Layout><WOHistoryPage /></Layout>} />
      <Route path="/maintain/wo-history/:id" element={<Layout><WOHistoryDetailPage /></Layout>} />
      
      {/* Manage Routes */}
      <Route path="/manage/asset-register" element={<Layout><AssetRegisterPage /></Layout>} />
      
      {/* Redirect to dashboard rather than showing 404 for common paths */}
      <Route path="/manage/*" element={<Layout><DashboardPage /></Layout>} />
      <Route path="/monitor/*" element={<Layout><DashboardPage /></Layout>} />
      <Route path="/maintain/*" element={<Layout><DashboardPage /></Layout>} />
      
      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
