import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import NotFound from './pages/NotFound'
import Index from './pages/Index'
import Overview from './pages/Overview'
import RBIAssessmentPVDetailPage from './pages/monitor/RBIAssessmentPVDetailPage'

// Admin Pages
import ClientPage from './pages/admin/setup/ClientPage'
import ClientDetailPage from './pages/admin/setup/ClientDetailPage'
import CompanyPage from './pages/admin/setup/CompanyPage'
import CompanyDetailPage from './pages/admin/setup/CompanyDetailPage'
import ProjectPage from './pages/admin/setup/ProjectPage'
import ProjectDetailPage from './pages/admin/setup/ProjectDetailPage'
import SensorPage from './pages/admin/setup/SensorPage'
import SensorDetailPage from './pages/admin/setup/SensorDetailPage'
import VendorPage from './pages/admin/setup/VendorPage'
import VendorDetailPage from './pages/admin/setup/VendorDetailPage'
import WorkCenterPage from './pages/admin/setup/WorkCenterPage'
import WorkCenterDetailPage from './pages/admin/setup/WorkCenterDetailPage'

// Settings Pages
import AssetClassPage from './pages/admin/settings/AssetClassPage'
import AssetClassDetailPage from './pages/admin/settings/AssetClassDetailPage'
import AssetTagPage from './pages/admin/settings/AssetTagPage'
import AssetTagDetailPage from './pages/admin/settings/AssetTagDetailPage'
import CorrosionGroupPage from './pages/admin/settings/CorrosionGroupPage'
import CorrosionGroupDetailPage from './pages/admin/settings/CorrosionGroupDetailPage'
import DataCategoryPage from './pages/admin/settings/DataCategoryPage'
import DataCategoryDetailPage from './pages/admin/settings/DataCategoryDetailPage'
import DisciplinePage from './pages/admin/settings/DisciplinePage'
import DisciplineDetailPage from './pages/admin/settings/DisciplineDetailPage'
import FrequencySetupPage from './pages/admin/settings/FrequencySetupPage'
import FrequencySetupDetailPage from './pages/admin/settings/FrequencySetupDetailPage'
import MaintenanceTypePage from './pages/admin/settings/MaintenanceTypePage'
import MaintenanceTypeDetailPage from './pages/admin/settings/MaintenanceTypeDetailPage'
import UserManagementPage from './pages/admin/settings/UserManagementPage'
import AverageUARSPage from './pages/admin/settings/AverageUARSPage'
import AverageUARSDetailPage from './pages/admin/settings/AverageUARSDetailPage'

// Manage Pages
import AssetDetailPage from './pages/manage/AssetDetailPage'
import AssetDetailsPage from './pages/manage/AssetDetailsPage'
import AssetHierarchyPage from './pages/manage/AssetHierarchyPage'
import AssetRegisterDetailPage from './pages/manage/AssetRegisterDetailPage'
import AssetRegisterPage from './pages/manage/AssetRegisterPage'
import AssetsPage from './pages/manage/AssetsPage'
import BomAssemblyPage from './pages/manage/BomAssemblyPage'
import FacilitiesPage from './pages/manage/FacilitiesPage'
import FacilityDetailPage from './pages/manage/FacilityDetailPage'
import InventoryPage from './pages/manage/InventoryPage'
import InventoryDetailPage from './pages/manage/InventoryDetailPage'
import InventoryItemDetailPage from './pages/manage/InventoryItemDetailPage'
import ItemsMasterPage from './pages/manage/ItemsMasterPage'
import ItemsMasterDetailPage from './pages/manage/ItemsMasterDetailPage'
import MaterialPage from './pages/manage/MaterialPage'
import MaterialDetailPage from './pages/manage/MaterialDetailPage'
import PackagePage from './pages/manage/PackagePage'
import PackageDetailPage from './pages/manage/PackageDetailPage'
import PartsInventoryPage from './pages/manage/PartsInventoryPage'
import PartsInventoryDetailPage from './pages/manage/PartsInventoryDetailPage'
import SystemPage from './pages/manage/SystemPage'
import SystemDetailPage from './pages/manage/SystemDetailPage'

// Maintain Pages
import PMSchedulePage from './pages/maintain/PMSchedulePage'
import PMScheduleDetailPage from './pages/maintain/PMScheduleDetailPage'
import TaskLibraryPage from './pages/maintain/TaskLibraryPage'
import TaskLibraryDetailPage from './pages/maintain/TaskLibraryDetailPage'
import WOHistoryPage from './pages/maintain/WOHistoryPage'
import WOHistoryDetailPage from './pages/maintain/WOHistoryDetailPage'
import WorkOrderDetailPage from './pages/maintain/WorkOrderDetailPage'
import WorkOrderListPage from './pages/maintain/WorkOrderListPage'
import WorkRequestPage from './pages/maintain/WorkRequestPage'
import WorkRequestDetailPage from './pages/maintain/WorkRequestDetailPage'

// Measure Pages
import AssetPerformancePage from './pages/measure/AssetPerformancePage'
import CostAnalysisPage from './pages/measure/CostAnalysisPage'
import KPIDashboardPage from './pages/measure/KPIDashboardPage'
import WorkAnalyticsPage from './pages/measure/WorkAnalyticsPage'

// Monitor Pages
import AssetIntegrityDetailPage from './pages/monitor/AssetIntegrityDetailPage'
import CorrosionStudiesPage from './pages/monitor/CorrosionStudiesPage'
import CorrosionStudiesDetailPage from './pages/monitor/CorrosionStudiesDetailPage'
import CriticalAssetsPage from './pages/monitor/CriticalAssetsPage'
import IMSDashboardPage from './pages/monitor/IMSDashboardPage'
import InspectionDataPage from './pages/monitor/InspectionDataPage'
import IntegrityPage from './pages/monitor/IntegrityPage'
import InventoryGroupsPage from './pages/monitor/InventoryGroupsPage'
import RBIAssessmentPage from './pages/monitor/RBIAssessmentPage'
import RBIAssessmentDetailPage from './pages/monitor/RBIAssessmentDetailPage'
import RMSAssetListPage from './pages/monitor/RMSAssetListPage'
import RMSAssetDetailPage from './pages/monitor/RMSAssetDetailPage'
import RMSDashboardPage from './pages/monitor/RMSDashboardPage'

// Vendor Pages
import VendorDashboardPage from './pages/vendor/VendorDashboardPage'

// Additional Pages
import './App.css'
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/overview" element={<Overview />} />

          {/* Admin Routes */}
          <Route path="/admin/setup/client" element={<ClientPage />} />
          <Route path="/admin/setup/client/:id" element={<ClientDetailPage />} />
          <Route path="/admin/setup/company" element={<CompanyPage />} />
          <Route path="/admin/setup/company/:id" element={<CompanyDetailPage />} />
          <Route path="/admin/setup/project" element={<ProjectPage />} />
          <Route path="/admin/setup/project/:id" element={<ProjectDetailPage />} />
          <Route path="/admin/setup/sensor" element={<SensorPage />} />
          <Route path="/admin/setup/sensor/:id" element={<SensorDetailPage />} />
          <Route path="/admin/setup/vendor" element={<VendorPage />} />
          <Route path="/admin/setup/vendor/:id" element={<VendorDetailPage />} />
          <Route path="/admin/setup/work-center" element={<WorkCenterPage />} />
          <Route path="/admin/setup/work-center/:id" element={<WorkCenterDetailPage />} />

          {/* Settings Routes */}
          <Route path="/admin/settings/asset-class" element={<AssetClassPage />} />
          <Route path="/admin/settings/asset-class/:id" element={<AssetClassDetailPage />} />
          <Route path="/admin/settings/asset-tag" element={<AssetTagPage />} />
          <Route path="/admin/settings/asset-tag/:id" element={<AssetTagDetailPage />} />
          <Route path="/admin/settings/corrosion-group" element={<CorrosionGroupPage />} />
          <Route path="/admin/settings/corrosion-group/:id" element={<CorrosionGroupDetailPage />} />
          <Route path="/admin/settings/data-category" element={<DataCategoryPage />} />
          <Route path="/admin/settings/data-category/:id" element={<DataCategoryDetailPage />} />
          <Route path="/admin/settings/discipline" element={<DisciplinePage />} />
          <Route path="/admin/settings/discipline/:id" element={<DisciplineDetailPage />} />
          <Route path="/admin/settings/frequency-setup" element={<FrequencySetupPage />} />
          <Route path="/admin/settings/frequency-setup/:id" element={<FrequencySetupDetailPage />} />
          <Route path="/admin/settings/maintenance-type" element={<MaintenanceTypePage />} />
          <Route path="/admin/settings/maintenance-type/:id" element={<MaintenanceTypeDetailPage />} />
          <Route path="/admin/settings/user-management" element={<UserManagementPage />} />
          <Route path="/admin/settings/average-uars" element={<AverageUARSPage />} />
          <Route path="/admin/settings/average-uars/:id" element={<AverageUARSDetailPage />} />

          {/* Manage Routes */}
          <Route path="/manage/assets" element={<AssetsPage />} />
          <Route path="/manage/assets/:id" element={<AssetDetailPage />} />
          <Route path="/manage/assets/details/:id" element={<AssetDetailsPage />} />
          <Route path="/manage/asset-hierarchy" element={<AssetHierarchyPage />} />
          <Route path="/manage/asset-register" element={<AssetRegisterPage />} />
          <Route path="/manage/asset-register/:id" element={<AssetRegisterDetailPage />} />
          <Route path="/manage/bom-assembly" element={<BomAssemblyPage />} />
          <Route path="/manage/facilities" element={<FacilitiesPage />} />
          <Route path="/manage/facilities/:id" element={<FacilityDetailPage />} />
          <Route path="/manage/inventory" element={<InventoryPage />} />
          <Route path="/manage/inventory/:id" element={<InventoryDetailPage />} />
          <Route path="/manage/inventory/item/:id" element={<InventoryItemDetailPage />} />
          <Route path="/manage/items-master" element={<ItemsMasterPage />} />
          <Route path="/manage/items-master/:id" element={<ItemsMasterDetailPage />} />
          <Route path="/manage/material" element={<MaterialPage />} />
          <Route path="/manage/material/:id" element={<MaterialDetailPage />} />
          <Route path="/manage/package" element={<PackagePage />} />
          <Route path="/manage/package/:id" element={<PackageDetailPage />} />
          <Route path="/manage/parts-inventory" element={<PartsInventoryPage />} />
          <Route path="/manage/parts-inventory/:id" element={<PartsInventoryDetailPage />} />
          <Route path="/manage/system" element={<SystemPage />} />
          <Route path="/manage/system/:id" element={<SystemDetailPage />} />

          {/* Maintain Routes */}
          <Route path="/maintain/pm-schedule" element={<PMSchedulePage />} />
          <Route path="/maintain/pm-schedule/:id" element={<PMScheduleDetailPage />} />
          <Route path="/maintain/task-library" element={<TaskLibraryPage />} />
          <Route path="/maintain/task-library/:id" element={<TaskLibraryDetailPage />} />
          <Route path="/maintain/wo-history" element={<WOHistoryPage />} />
          <Route path="/maintain/wo-history/:id" element={<WOHistoryDetailPage />} />
          <Route path="/maintain/work-orders" element={<WorkOrderListPage />} />
          <Route path="/maintain/work-orders/:id" element={<WorkOrderDetailPage />} />
          <Route path="/maintain/work-request" element={<WorkRequestPage />} />
          <Route path="/maintain/work-request/:id" element={<WorkRequestDetailPage />} />

          {/* Measure Routes */}
          <Route path="/measure/asset-performance" element={<AssetPerformancePage />} />
          <Route path="/measure/cost-analysis" element={<CostAnalysisPage />} />
          <Route path="/measure/kpi-dashboard" element={<KPIDashboardPage />} />
          <Route path="/measure/work-analytics" element={<WorkAnalyticsPage />} />

          {/* Monitor Routes */}
          <Route path="/monitor/asset-integrity/:id" element={<AssetIntegrityDetailPage />} />
          <Route path="/monitor/corrosion-studies" element={<CorrosionStudiesPage />} />
          <Route path="/monitor/corrosion-studies/:id" element={<CorrosionStudiesDetailPage />} />
          <Route path="/monitor/critical-assets" element={<CriticalAssetsPage />} />
          <Route path="/monitor/ims-dashboard" element={<IMSDashboardPage />} />
          <Route path="/monitor/inspection-data" element={<InspectionDataPage />} />
          <Route path="/monitor/integrity" element={<IntegrityPage />} />
          <Route path="/monitor/inventory-groups" element={<InventoryGroupsPage />} />
          <Route path="/monitor/rbi-assessment" element={<RBIAssessmentPage />} />
          <Route path="/monitor/rbi-assessment/:id" element={<RBIAssessmentDetailPage />} />
          <Route path="/monitor/rbi-assessment-pv/:id" element={<RBIAssessmentPVDetailPage />} />
          <Route path="/monitor/rms-asset-list" element={<RMSAssetListPage />} />
          <Route path="/monitor/rms-asset-detail/:id" element={<RMSAssetDetailPage />} />
          <Route path="/monitor/rms-dashboard" element={<RMSDashboardPage />} />

          {/* Vendor Routes */}
          <Route path="/vendor/dashboard" element={<VendorDashboardPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Toaster />
    </>
  )
}

export default App
