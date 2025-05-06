
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Overview from './pages/Overview';

// Admin pages
import ClientPage from './pages/admin/setup/ClientPage';
import CompanyPage from './pages/admin/setup/CompanyPage';
import ProjectPage from './pages/admin/setup/ProjectPage';
import SensorPage from './pages/admin/setup/SensorPage';
import VendorPage from './pages/admin/setup/VendorPage';
import WorkCenterPage from './pages/admin/setup/WorkCenterPage';

// Admin settings pages
import AssetClassPage from './pages/admin/settings/AssetClassPage';
import AssetTagPage from './pages/admin/settings/AssetTagPage';
import AverageUARSPage from './pages/admin/settings/AverageUARSPage';
import CorrosionGroupPage from './pages/admin/settings/CorrosionGroupPage';
import DataCategoryPage from './pages/admin/settings/DataCategoryPage';
import DisciplinePage from './pages/admin/settings/DisciplinePage';
import FrequencySetupPage from './pages/admin/settings/FrequencySetupPage';
import MaintenanceTypePage from './pages/admin/settings/MaintenanceTypePage';

// Manage Pages
import AssetHierarchyPage from './pages/manage/AssetHierarchyPage';
import AssetRegisterPage from './pages/manage/AssetRegisterPage';
import AssetsPage from './pages/manage/AssetsPage';
import AssetDetailsPage from './pages/manage/AssetDetailsPage';
import BomAssemblyPage from './pages/manage/BomAssemblyPage';
import FacilitiesPage from './pages/manage/FacilitiesPage';
import InventoryPage from './pages/manage/InventoryPage';
import ItemsMasterPage from './pages/manage/ItemsMasterPage';
import MaterialPage from './pages/manage/MaterialPage';
import PackagePage from './pages/manage/PackagePage';
import PartsInventoryPage from './pages/manage/PartsInventoryPage';
import SystemPage from './pages/manage/SystemPage';

// Maintain Pages
import PMSchedulePage from './pages/maintain/PMSchedulePage';
import TaskLibraryPage from './pages/maintain/TaskLibraryPage';
import WOHistoryPage from './pages/maintain/WOHistoryPage';
import WorkOrderListPage from './pages/maintain/WorkOrderListPage';
import WorkRequestPage from './pages/maintain/WorkRequestPage';

// Measure Pages
import AssetPerformancePage from './pages/measure/AssetPerformancePage';
import CostAnalysisPage from './pages/measure/CostAnalysisPage';
import KPIDashboardPage from './pages/measure/KPIDashboardPage';
import WorkAnalyticsPage from './pages/measure/WorkAnalyticsPage';

// Monitor Pages
import CorrosionStudiesPage from './pages/monitor/CorrosionStudiesPage';
import CriticalAssetsPage from './pages/monitor/CriticalAssetsPage';
import IMSDashboardPage from './pages/monitor/IMSDashboardPage';
import InspectionDataPage from './pages/monitor/InspectionDataPage';
import IntegrityPage from './pages/monitor/IntegrityPage';
import InventoryGroupsPage from './pages/monitor/InventoryGroupsPage';
import RBIAssessmentPage from './pages/monitor/RBIAssessmentPage';
import RMSAssetListPage from './pages/monitor/RMSAssetListPage';
import RMSDashboardPage from './pages/monitor/RMSDashboardPage';

// Integrity Pages
import IntegrityModulePage from './pages/integrity/IntegrityModulePage';

// Vendor Pages
import VendorDashboardPage from './pages/vendor/VendorDashboardPage';

import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <Router>
      <main>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/overview" element={<Overview />} />
            
            {/* Admin routes */}
            <Route path="/admin/setup/client" element={<ClientPage />} />
            <Route path="/admin/setup/company" element={<CompanyPage />} />
            <Route path="/admin/setup/project" element={<ProjectPage />} />
            <Route path="/admin/setup/sensor" element={<SensorPage />} />
            <Route path="/admin/setup/vendor" element={<VendorPage />} />
            <Route path="/admin/setup/work-center" element={<WorkCenterPage />} />
            
            {/* Admin settings routes */}
            <Route path="/admin/settings/asset-class" element={<AssetClassPage />} />
            <Route path="/admin/settings/asset-tag" element={<AssetTagPage />} />
            <Route path="/admin/settings/average-uars" element={<AverageUARSPage />} />
            <Route path="/admin/settings/corrosion-group" element={<CorrosionGroupPage />} />
            <Route path="/admin/settings/data-category" element={<DataCategoryPage />} />
            <Route path="/admin/settings/discipline" element={<DisciplinePage />} />
            <Route path="/admin/settings/frequency-setup" element={<FrequencySetupPage />} />
            <Route path="/admin/settings/maintenance-type" element={<MaintenanceTypePage />} />
            
            {/* Manage routes */}
            <Route path="/manage/asset-hierarchy" element={<AssetHierarchyPage />} />
            <Route path="/manage/asset-register" element={<AssetRegisterPage />} />
            <Route path="/manage/assets" element={<AssetsPage />} />
            <Route path="/manage/assets/:id" element={<AssetDetailsPage />} />
            <Route path="/manage/bom-assembly" element={<BomAssemblyPage />} />
            <Route path="/manage/facilities" element={<FacilitiesPage />} />
            <Route path="/manage/inventory" element={<InventoryPage />} />
            <Route path="/manage/items-master" element={<ItemsMasterPage />} />
            <Route path="/manage/material" element={<MaterialPage />} />
            <Route path="/manage/package" element={<PackagePage />} />
            <Route path="/manage/parts-inventory" element={<PartsInventoryPage />} />
            <Route path="/manage/system" element={<SystemPage />} />
            
            {/* Maintain routes */}
            <Route path="/maintain/pm-schedule" element={<PMSchedulePage />} />
            <Route path="/maintain/task-library" element={<TaskLibraryPage />} />
            <Route path="/maintain/wo-history" element={<WOHistoryPage />} />
            <Route path="/maintain/work-order-list" element={<WorkOrderListPage />} />
            <Route path="/maintain/work-request" element={<WorkRequestPage />} />
            
            {/* Measure routes */}
            <Route path="/measure/asset-performance" element={<AssetPerformancePage />} />
            <Route path="/measure/cost-analysis" element={<CostAnalysisPage />} />
            <Route path="/measure/kpi-dashboard" element={<KPIDashboardPage />} />
            <Route path="/measure/work-analytics" element={<WorkAnalyticsPage />} />
            
            {/* Monitor routes */}
            <Route path="/monitor/corrosion-studies" element={<CorrosionStudiesPage />} />
            <Route path="/monitor/critical-assets" element={<CriticalAssetsPage />} />
            <Route path="/monitor/ims-dashboard" element={<IMSDashboardPage />} />
            <Route path="/monitor/inspection-data" element={<InspectionDataPage />} />
            <Route path="/monitor/integrity" element={<IntegrityPage />} />
            <Route path="/monitor/inventory-groups" element={<InventoryGroupsPage />} />
            <Route path="/monitor/rbi-assessment" element={<RBIAssessmentPage />} />
            <Route path="/monitor/rms-asset-list" element={<RMSAssetListPage />} />
            <Route path="/monitor/rms-asset-list/:id" element={<RMSAssetListPage />} />
            <Route path="/monitor/rms-dashboard" element={<RMSDashboardPage />} />
            
            {/* Integrity routes */}
            <Route path="/integrity/module" element={<IntegrityModulePage />} />
            
            {/* Vendor routes */}
            <Route path="/vendor/dashboard" element={<VendorDashboardPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <Toaster />
      </main>
    </Router>
  );
}

export default App;
