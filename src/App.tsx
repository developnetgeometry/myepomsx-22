
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Overview from './pages/Overview';
import NotFound from './pages/NotFound';

// Manage pages
import AssetsPage from './pages/manage/AssetsPage';
import AssetHierarchyPage from './pages/manage/AssetHierarchyPage';
import AssetRegisterPage from './pages/manage/AssetRegisterPage';
import BomAssemblyPage from './pages/manage/BomAssemblyPage';
import FacilitiesPage from './pages/manage/FacilitiesPage';
import InventoryPage from './pages/manage/InventoryPage';
import ItemsMasterPage from './pages/manage/ItemsMasterPage';
import MaterialPage from './pages/manage/MaterialPage';
import PackagePage from './pages/manage/PackagePage';
import PartsInventoryPage from './pages/manage/PartsInventoryPage';
import PartsInventoryDetailPage from './pages/manage/PartsInventoryDetailPage';
import SystemPage from './pages/manage/SystemPage';

// Maintain pages
import PMSchedulePage from './pages/maintain/PMSchedulePage';
import TaskLibraryPage from './pages/maintain/TaskLibraryPage';
import WOHistoryPage from './pages/maintain/WOHistoryPage';
import WorkOrderListPage from './pages/maintain/WorkOrderListPage';
import WorkRequestPage from './pages/maintain/WorkRequestPage';

// Measure pages
import AssetPerformancePage from './pages/measure/AssetPerformancePage';
import CostAnalysisPage from './pages/measure/CostAnalysisPage';
import KPIDashboardPage from './pages/measure/KPIDashboardPage';
import WorkAnalyticsPage from './pages/measure/WorkAnalyticsPage';

// Monitor pages
import CorrosionStudiesPage from './pages/monitor/CorrosionStudiesPage';
import CriticalAssetsPage from './pages/monitor/CriticalAssetsPage';
import IMSDashboardPage from './pages/monitor/IMSDashboardPage';
import InspectionDataPage from './pages/monitor/InspectionDataPage';
import IntegrityPage from './pages/monitor/IntegrityPage';
import InventoryGroupsPage from './pages/monitor/InventoryGroupsPage';
import RBIAssessmentPage from './pages/monitor/RBIAssessmentPage';
import RMSAssetListPage from './pages/monitor/RMSAssetListPage';
import RMSDashboardPage from './pages/monitor/RMSDashboardPage';

// Admin pages
import AssetClassPage from './pages/admin/settings/AssetClassPage';
import AssetTagPage from './pages/admin/settings/AssetTagPage';
import AverageUARSPage from './pages/admin/settings/AverageUARSPage';
import ClientPage from './pages/admin/setup/ClientPage';
import CompanyPage from './pages/admin/setup/CompanyPage';
import CorrosionGroupPage from './pages/admin/settings/CorrosionGroupPage';
import DataCategoryPage from './pages/admin/settings/DataCategoryPage';
import DisciplinePage from './pages/admin/settings/DisciplinePage';
import FrequencySetupPage from './pages/admin/settings/FrequencySetupPage';
import MaintenanceTypePage from './pages/admin/settings/MaintenanceTypePage';
import ProjectPage from './pages/admin/setup/ProjectPage';
import SensorPage from './pages/admin/setup/SensorPage';
import VendorPage from './pages/admin/setup/VendorPage';
import WorkCenterPage from './pages/admin/setup/WorkCenterPage';

// Integrity pages
import IntegrityModulePage from './pages/integrity/IntegrityModulePage';

// Vendor pages
import VendorDashboardPage from './pages/vendor/VendorDashboardPage';

// Provide the ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Overview /></Layout>} />
        
        {/* Manage routes */}
        <Route path="/manage/assets" element={<Layout><AssetsPage /></Layout>} />
        <Route path="/manage/asset-hierarchy" element={<Layout><AssetHierarchyPage /></Layout>} />
        <Route path="/manage/asset-register" element={<Layout><AssetRegisterPage /></Layout>} />
        <Route path="/manage/bom-assembly" element={<Layout><BomAssemblyPage /></Layout>} />
        <Route path="/manage/facilities" element={<Layout><FacilitiesPage /></Layout>} />
        <Route path="/manage/inventory" element={<Layout><InventoryPage /></Layout>} />
        <Route path="/manage/items-master" element={<Layout><ItemsMasterPage /></Layout>} />
        <Route path="/manage/material" element={<Layout><MaterialPage /></Layout>} />
        <Route path="/manage/package" element={<Layout><PackagePage /></Layout>} />
        <Route path="/manage/parts-inventory" element={<Layout><PartsInventoryPage /></Layout>} />
        <Route path="/manage/parts-inventory/:id" element={<Layout><PartsInventoryDetailPage /></Layout>} />
        <Route path="/manage/system" element={<Layout><SystemPage /></Layout>} />
        
        {/* Maintain routes */}
        <Route path="/maintain/pm-schedule" element={<Layout><PMSchedulePage /></Layout>} />
        <Route path="/maintain/task-library" element={<Layout><TaskLibraryPage /></Layout>} />
        <Route path="/maintain/wo-history" element={<Layout><WOHistoryPage /></Layout>} />
        <Route path="/maintain/work-order-list" element={<Layout><WorkOrderListPage /></Layout>} />
        <Route path="/maintain/work-request" element={<Layout><WorkRequestPage /></Layout>} />
        
        {/* Measure routes */}
        <Route path="/measure/asset-performance" element={<Layout><AssetPerformancePage /></Layout>} />
        <Route path="/measure/cost-analysis" element={<Layout><CostAnalysisPage /></Layout>} />
        <Route path="/measure/kpi-dashboard" element={<Layout><KPIDashboardPage /></Layout>} />
        <Route path="/measure/work-analytics" element={<Layout><WorkAnalyticsPage /></Layout>} />
        
        {/* Monitor routes */}
        <Route path="/monitor/corrosion-studies" element={<Layout><CorrosionStudiesPage /></Layout>} />
        <Route path="/monitor/critical-assets" element={<Layout><CriticalAssetsPage /></Layout>} />
        <Route path="/monitor/ims-dashboard" element={<Layout><IMSDashboardPage /></Layout>} />
        <Route path="/monitor/inspection-data" element={<Layout><InspectionDataPage /></Layout>} />
        <Route path="/monitor/integrity" element={<Layout><IntegrityPage /></Layout>} />
        <Route path="/monitor/inventory-groups" element={<Layout><InventoryGroupsPage /></Layout>} />
        <Route path="/monitor/rbi-assessment" element={<Layout><RBIAssessmentPage /></Layout>} />
        <Route path="/monitor/rms-asset-list" element={<Layout><RMSAssetListPage /></Layout>} />
        <Route path="/monitor/rms-dashboard" element={<Layout><RMSDashboardPage /></Layout>} />
        
        {/* Admin routes */}
        <Route path="/admin/settings/asset-class" element={<Layout><AssetClassPage /></Layout>} />
        <Route path="/admin/settings/asset-tag" element={<Layout><AssetTagPage /></Layout>} />
        <Route path="/admin/settings/average-uars" element={<Layout><AverageUARSPage /></Layout>} />
        <Route path="/admin/settings/corrosion-group" element={<Layout><CorrosionGroupPage /></Layout>} />
        <Route path="/admin/settings/data-category" element={<Layout><DataCategoryPage /></Layout>} />
        <Route path="/admin/settings/discipline" element={<Layout><DisciplinePage /></Layout>} />
        <Route path="/admin/settings/frequency-setup" element={<Layout><FrequencySetupPage /></Layout>} />
        <Route path="/admin/settings/maintenance-type" element={<Layout><MaintenanceTypePage /></Layout>} />
        
        <Route path="/admin/setup/client" element={<Layout><ClientPage /></Layout>} />
        <Route path="/admin/setup/company" element={<Layout><CompanyPage /></Layout>} />
        <Route path="/admin/setup/project" element={<Layout><ProjectPage /></Layout>} />
        <Route path="/admin/setup/sensor" element={<Layout><SensorPage /></Layout>} />
        <Route path="/admin/setup/vendor" element={<Layout><VendorPage /></Layout>} />
        <Route path="/admin/setup/work-center" element={<Layout><WorkCenterPage /></Layout>} />
        
        {/* Integrity routes */}
        <Route path="/integrity/module" element={<Layout><IntegrityModulePage /></Layout>} />
        
        {/* Vendor routes */}
        <Route path="/vendor/dashboard" element={<Layout><VendorDashboardPage /></Layout>} />
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
