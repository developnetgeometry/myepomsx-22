
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Overview from './pages/Overview';
import NotFound from './pages/NotFound';

// Manage pages
import AssetsPage from './pages/manage/AssetsPage';
import AssetHierarchyPage from './pages/manage/AssetHierarchyPage';
import AssetRegisterPage from './pages/manage/AssetRegisterPage';
import AssetRegisterDetailPage from './pages/manage/AssetRegisterDetailPage';
import BomAssemblyPage from './pages/manage/BomAssemblyPage';
import FacilitiesPage from './pages/manage/FacilitiesPage';
import FacilityDetailPage from './pages/manage/FacilityDetailPage';
import InventoryPage from './pages/manage/InventoryPage';
import InventoryDetailPage from './pages/manage/InventoryDetailPage';
import ItemsMasterPage from './pages/manage/ItemsMasterPage';
import ItemsMasterDetailPage from './pages/manage/ItemsMasterDetailPage';
import MaterialPage from './pages/manage/MaterialPage';
import MaterialDetailPage from './pages/manage/MaterialDetailPage';
import PackagePage from './pages/manage/PackagePage';
import PackageDetailPage from './pages/manage/PackageDetailPage';
import PartsInventoryPage from './pages/manage/PartsInventoryPage';
import PartsInventoryDetailPage from './pages/manage/PartsInventoryDetailPage';
import SystemPage from './pages/manage/SystemPage';
import SystemDetailPage from './pages/manage/SystemDetailPage';

// Maintain pages
import PMSchedulePage from './pages/maintain/PMSchedulePage';
import PMScheduleDetailPage from './pages/maintain/PMScheduleDetailPage';
import TaskLibraryPage from './pages/maintain/TaskLibraryPage';
import TaskLibraryDetailPage from './pages/maintain/TaskLibraryDetailPage';
import WOHistoryPage from './pages/maintain/WOHistoryPage';
import WOHistoryDetailPage from './pages/maintain/WOHistoryDetailPage';
import WorkOrderListPage from './pages/maintain/WorkOrderListPage';
import WorkOrderDetailPage from './pages/maintain/WorkOrderDetailPage';
import WorkRequestPage from './pages/maintain/WorkRequestPage';
import WorkRequestDetailPage from './pages/maintain/WorkRequestDetailPage';

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
import AssetTagDetailPage from './pages/admin/settings/AssetTagDetailPage';
import AverageUARSPage from './pages/admin/settings/AverageUARSPage';
import AverageUARSDetailPage from './pages/admin/settings/AverageUARSDetailPage';
import ClientPage from './pages/admin/setup/ClientPage';
import CompanyPage from './pages/admin/setup/CompanyPage';
import CompanyDetailPage from './pages/admin/setup/CompanyDetailPage';
import CorrosionGroupPage from './pages/admin/settings/CorrosionGroupPage';
import DataCategoryPage from './pages/admin/settings/DataCategoryPage';
import DataCategoryDetailPage from './pages/admin/settings/DataCategoryDetailPage';
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
        <Route path="/manage/asset-register/:id" element={<Layout><AssetRegisterDetailPage /></Layout>} />
        <Route path="/manage/bom-assembly" element={<Layout><BomAssemblyPage /></Layout>} />
        <Route path="/manage/facilities" element={<Layout><FacilitiesPage /></Layout>} />
        <Route path="/manage/facilities/:id" element={<Layout><FacilityDetailPage /></Layout>} />
        <Route path="/manage/inventory" element={<Layout><InventoryPage /></Layout>} />
        <Route path="/manage/inventory/:id" element={<Layout><InventoryDetailPage /></Layout>} />
        <Route path="/manage/items-master" element={<Layout><ItemsMasterPage /></Layout>} />
        <Route path="/manage/items-master/:id" element={<Layout><ItemsMasterDetailPage /></Layout>} />
        <Route path="/manage/material" element={<Layout><MaterialPage /></Layout>} />
        <Route path="/manage/material/:id" element={<Layout><MaterialDetailPage /></Layout>} />
        <Route path="/manage/package" element={<Layout><PackagePage /></Layout>} />
        <Route path="/manage/package/:id" element={<Layout><PackageDetailPage /></Layout>} />
        <Route path="/manage/parts-inventory" element={<Layout><PartsInventoryPage /></Layout>} />
        <Route path="/manage/parts-inventory/:id" element={<Layout><PartsInventoryDetailPage /></Layout>} />
        <Route path="/manage/system" element={<Layout><SystemPage /></Layout>} />
        <Route path="/manage/system/:id" element={<Layout><SystemDetailPage /></Layout>} />
        
        {/* Maintain routes */}
        <Route path="/maintain/pm-schedule" element={<Layout><PMSchedulePage /></Layout>} />
        <Route path="/maintain/pm-schedule/:id" element={<Layout><PMScheduleDetailPage /></Layout>} />
        <Route path="/maintain/task-library" element={<Layout><TaskLibraryPage /></Layout>} />
        <Route path="/maintain/task-library/:id" element={<Layout><TaskLibraryDetailPage /></Layout>} />
        <Route path="/maintain/wo-history" element={<Layout><WOHistoryPage /></Layout>} />
        <Route path="/maintain/wo-history/:id" element={<Layout><WOHistoryDetailPage /></Layout>} />
        <Route path="/maintain/work-order-list" element={<Layout><WorkOrderListPage /></Layout>} />
        <Route path="/maintain/work-order-list/:id" element={<Layout><WorkOrderDetailPage /></Layout>} />
        <Route path="/maintain/work-request" element={<Layout><WorkRequestPage /></Layout>} />
        <Route path="/maintain/work-request/:id" element={<Layout><WorkRequestDetailPage /></Layout>} />
        
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
        <Route path="/admin/settings/asset-tag/:id" element={<Layout><AssetTagDetailPage /></Layout>} />
        <Route path="/admin/settings/average-uars" element={<Layout><AverageUARSPage /></Layout>} />
        <Route path="/admin/settings/average-uars/:id" element={<Layout><AverageUARSDetailPage /></Layout>} />
        <Route path="/admin/settings/corrosion-group" element={<Layout><CorrosionGroupPage /></Layout>} />
        <Route path="/admin/settings/data-category" element={<Layout><DataCategoryPage /></Layout>} />
        <Route path="/admin/settings/data-category/:id" element={<Layout><DataCategoryDetailPage /></Layout>} />
        <Route path="/admin/settings/discipline" element={<Layout><DisciplinePage /></Layout>} />
        <Route path="/admin/settings/frequency-setup" element={<Layout><FrequencySetupPage /></Layout>} />
        <Route path="/admin/settings/maintenance-type" element={<Layout><MaintenanceTypePage /></Layout>} />
        
        <Route path="/admin/setup/client" element={<Layout><ClientPage /></Layout>} />
        <Route path="/admin/setup/company" element={<Layout><CompanyPage /></Layout>} />
        <Route path="/admin/setup/company/:id" element={<Layout><CompanyDetailPage /></Layout>} />
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
