
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
import AssetRegisterDetailPage from '@/pages/manage/AssetRegisterDetailPage';
import DashboardPage from '@/pages/DashboardPage';
import SystemPage from '@/pages/manage/SystemPage';
import AssetHierarchyPage from '@/pages/manage/AssetHierarchyPage';
import TaskLibraryPage from '@/pages/maintain/TaskLibraryPage';
import TaskLibraryDetailPage from '@/pages/maintain/TaskLibraryDetailPage';
import WorkRequestPage from '@/pages/maintain/WorkRequestPage';
import WorkRequestDetailPage from '@/pages/maintain/WorkRequestDetailPage';

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
      <Route path="/maintain/task-library" element={<Layout><TaskLibraryPage /></Layout>} />
      <Route path="/maintain/task-library/:id" element={<Layout><TaskLibraryDetailPage /></Layout>} />
      <Route path="/maintain/work-request" element={<Layout><WorkRequestPage /></Layout>} />
      <Route path="/maintain/work-request/:id" element={<Layout><WorkRequestDetailPage /></Layout>} />
      
      {/* Manage Routes */}
      <Route path="/manage/asset-register" element={<Layout><AssetRegisterPage /></Layout>} />
      <Route path="/manage/asset-register/:id" element={<Layout><AssetRegisterDetailPage /></Layout>} />
      <Route path="/manage/system" element={<Layout><SystemPage /></Layout>} />
      <Route path="/manage/asset-hierarchy" element={<Layout><AssetHierarchyPage /></Layout>} />
      
      {/* 404 Not Found - Only use for completely unknown routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
