
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
import AssetsPage from '@/pages/manage/AssetsPage';
import IntegrityModulePage from '@/pages/integrity/IntegrityModulePage';
import CompanyDetailPage from '@/pages/admin/setup/CompanyDetailPage';
import ClientPage from '@/pages/admin/setup/ClientPage';
import FacilitiesPage from '@/pages/manage/FacilitiesPage';
import PackagePage from '@/pages/manage/PackagePage';
import PackageDetailPage from '@/pages/manage/PackageDetailPage';
import ItemsMasterPage from '@/pages/manage/ItemsMasterPage';
import ItemsMasterDetailPage from '@/pages/manage/ItemsMasterDetailPage';
import InventoryPage from '@/pages/manage/InventoryPage';
import InventoryItemDetailPage from '@/pages/manage/InventoryItemDetailPage';
import BomAssemblyPage from '@/pages/manage/BomAssemblyPage';
import WorkOrderListPage from '@/pages/maintain/WorkOrderListPage';
import WorkOrderDetailPage from '@/pages/maintain/WorkOrderDetailPage';
import PMSchedulePage from '@/pages/maintain/PMSchedulePage';
import PMScheduleDetailPage from '@/pages/maintain/PMScheduleDetailPage';
import MaterialPage from '@/pages/manage/MaterialPage';

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
      <Route path="/maintain/work-order-list" element={<Layout><WorkOrderListPage /></Layout>} />
      <Route path="/maintain/work-order-list/:id" element={<Layout><WorkOrderDetailPage /></Layout>} />
      <Route path="/maintain/pm-schedule" element={<Layout><PMSchedulePage /></Layout>} />
      <Route path="/maintain/pm-schedule/:id" element={<Layout><PMScheduleDetailPage /></Layout>} />
      
      {/* Manage Routes */}
      <Route path="/manage/asset-register" element={<Layout><AssetRegisterPage /></Layout>} />
      <Route path="/manage/asset-register/:id" element={<Layout><AssetRegisterDetailPage /></Layout>} />
      <Route path="/manage/system" element={<Layout><SystemPage /></Layout>} />
      <Route path="/manage/asset-hierarchy" element={<Layout><AssetHierarchyPage /></Layout>} />
      <Route path="/manage/assets" element={<Layout><AssetsPage /></Layout>} />
      <Route path="/manage/assets/:id" element={<Layout><AssetDetailsPage /></Layout>} />
      <Route path="/manage/facilities" element={<Layout><FacilitiesPage /></Layout>} />
      <Route path="/manage/package" element={<Layout><PackagePage /></Layout>} />
      <Route path="/manage/package/:id" element={<Layout><PackageDetailPage /></Layout>} />
      <Route path="/manage/items-master" element={<Layout><ItemsMasterPage /></Layout>} />
      <Route path="/manage/items-master/:id" element={<Layout><ItemsMasterDetailPage /></Layout>} />
      <Route path="/manage/inventory" element={<Layout><InventoryPage /></Layout>} />
      <Route path="/manage/inventory/:id" element={<Layout><InventoryItemDetailPage /></Layout>} />
      <Route path="/manage/bom-assembly" element={<Layout><BomAssemblyPage /></Layout>} />
      <Route path="/manage/material" element={<Layout><MaterialPage /></Layout>} />
      
      {/* Integrity Routes */}
      <Route path="/integrity" element={<Layout><IntegrityModulePage /></Layout>} />
      
      {/* Admin Routes */}
      <Route path="/admin/setup/company/:id" element={<Layout><CompanyDetailPage /></Layout>} />
      <Route path="/admin/setup/client" element={<Layout><ClientPage /></Layout>} />
      
      {/* 404 Not Found - Only use for completely unknown routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
