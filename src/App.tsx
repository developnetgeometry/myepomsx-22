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
          {/* ... keep existing code (Settings Routes) */}

          {/* Manage Routes */}
          {/* ... keep existing code (Manage Routes) */}

          {/* Maintain Routes */}
          {/* ... keep existing code (Maintain Routes) */}

          {/* Measure Routes */}
          {/* ... keep existing code (Measure Routes) */}

          {/* Monitor Routes */}
          {/* ... keep existing code (Monitor Routes) */}

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
