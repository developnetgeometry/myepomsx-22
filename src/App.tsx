import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Overview from "./pages/Overview";
import WorkRequestPage from "./pages/maintain/WorkRequestPage";
import VendorDashboardPage from "./pages/vendor/VendorDashboardPage";
import NotFound from "./pages/NotFound";

// Manage module pages
import FacilitiesPage from "./pages/manage/FacilitiesPage";
import SystemPage from "./pages/manage/SystemPage";
import PackagePage from "./pages/manage/PackagePage";
import AssetsPage from "./pages/manage/AssetsPage";
import BomAssemblyPage from "./pages/manage/BomAssemblyPage";
import AssetHierarchyPage from "./pages/manage/AssetHierarchyPage";
import MaterialPage from "./pages/manage/MaterialPage";
import ItemsMasterPage from "./pages/manage/ItemsMasterPage";
import InventoryPage from "./pages/manage/InventoryPage";

// Maintain module pages
import PMSchedulePage from "./pages/maintain/PMSchedulePage";
import WorkOrderListPage from "./pages/maintain/WorkOrderListPage";
import TaskLibraryPage from "./pages/maintain/TaskLibraryPage";
import WOHistoryPage from "./pages/maintain/WOHistoryPage";

// Monitor module pages
import IMSDashboardPage from "./pages/monitor/IMSDashboardPage";
import IntegrityPage from "./pages/monitor/IntegrityPage";
import RBIAssessmentPage from "./pages/monitor/RBIAssessmentPage";
import CorrosionStudiesPage from "./pages/monitor/CorrosionStudiesPage";
import InspectionDataPage from "./pages/monitor/InspectionDataPage";
import InventoryGroupsPage from "./pages/monitor/InventoryGroupsPage";
import RMSAssetListPage from "./pages/monitor/RMSAssetListPage";
import CriticalAssetsPage from "./pages/monitor/CriticalAssetsPage";
import RMSDashboardPage from "./pages/monitor/RMSDashboardPage";

// Measure module pages
import AssetPerformancePage from "./pages/measure/AssetPerformancePage";
import WorkAnalyticsPage from "./pages/measure/WorkAnalyticsPage";
import CostAnalysisPage from "./pages/measure/CostAnalysisPage";
import KPIDashboardPage from "./pages/measure/KPIDashboardPage";

// Admin module pages
import CompanyPage from "./pages/admin/setup/CompanyPage";
import ClientPage from "./pages/admin/setup/ClientPage";
import ProjectPage from "./pages/admin/setup/ProjectPage";
import VendorPage from "./pages/admin/setup/VendorPage";
import SensorPage from "./pages/admin/setup/SensorPage";
import WorkCenterPage from "./pages/admin/setup/WorkCenterPage";
import DataCategoryPage from "./pages/admin/settings/DataCategoryPage";
import AssetTagPage from "./pages/admin/settings/AssetTagPage";
import AssetClassPage from "./pages/admin/settings/AssetClassPage";
import DisciplinePage from "./pages/admin/settings/DisciplinePage";
import MaintenanceTypePage from "./pages/admin/settings/MaintenanceTypePage";
import FrequencySetupPage from "./pages/admin/settings/FrequencySetupPage";
import AverageUARSPage from "./pages/admin/settings/AverageUARSPage";
import CorrosionGroupPage from "./pages/admin/settings/CorrosionGroupPage";

// Integrity module page
import IntegrityModulePage from "./pages/integrity/IntegrityModulePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Overview /></Layout>} />
          
          {/* Manage Module */}
          <Route path="/manage/facilities" element={<Layout><FacilitiesPage /></Layout>} />
          <Route path="/manage/system" element={<Layout><SystemPage /></Layout>} />
          <Route path="/manage/package" element={<Layout><PackagePage /></Layout>} />
          <Route path="/manage/assets" element={<Layout><AssetsPage /></Layout>} />
          <Route path="/manage/bom-assembly" element={<Layout><BomAssemblyPage /></Layout>} />
          <Route path="/manage/asset-hierarchy" element={<Layout><AssetHierarchyPage /></Layout>} />
          <Route path="/manage/material" element={<Layout><MaterialPage /></Layout>} />
          <Route path="/manage/items-master" element={<Layout><ItemsMasterPage /></Layout>} />
          <Route path="/manage/inventory" element={<Layout><InventoryPage /></Layout>} />
          
          {/* Maintain Module */}
          <Route path="/maintain/pm-schedule" element={<Layout><PMSchedulePage /></Layout>} />
          <Route path="/maintain/work-request" element={<Layout><WorkRequestPage /></Layout>} />
          <Route path="/maintain/work-order-list" element={<Layout><WorkOrderListPage /></Layout>} />
          <Route path="/maintain/task-library" element={<Layout><TaskLibraryPage /></Layout>} />
          <Route path="/maintain/wo-history" element={<Layout><WOHistoryPage /></Layout>} />
          
          {/* Monitor Module */}
          <Route path="/monitor/ims-dashboard" element={<Layout><IMSDashboardPage /></Layout>} />
          <Route path="/monitor/integrity" element={<Layout><IntegrityPage /></Layout>} />
          <Route path="/monitor/rbi-assessment" element={<Layout><RBIAssessmentPage /></Layout>} />
          <Route path="/monitor/corrosion-studies" element={<Layout><CorrosionStudiesPage /></Layout>} />
          <Route path="/monitor/inspection-data" element={<Layout><InspectionDataPage /></Layout>} />
          <Route path="/monitor/inventory-groups" element={<Layout><InventoryGroupsPage /></Layout>} />
          <Route path="/monitor/rms-asset-list" element={<Layout><RMSAssetListPage /></Layout>} />
          <Route path="/monitor/critical-assets" element={<Layout><CriticalAssetsPage /></Layout>} />
          <Route path="/monitor/rms-dashboard" element={<Layout><RMSDashboardPage /></Layout>} />
          
          {/* Measure Module */}
          <Route path="/measure/asset-performance" element={<Layout><AssetPerformancePage /></Layout>} />
          <Route path="/measure/work-analytics" element={<Layout><WorkAnalyticsPage /></Layout>} />
          <Route path="/measure/cost-analysis" element={<Layout><CostAnalysisPage /></Layout>} />
          <Route path="/measure/kpi-dashboard" element={<Layout><KPIDashboardPage /></Layout>} />
          
          {/* Admin Module */}
          <Route path="/admin/setup/company" element={<Layout><CompanyPage /></Layout>} />
          <Route path="/admin/setup/client" element={<Layout><ClientPage /></Layout>} />
          <Route path="/admin/setup/project" element={<Layout><ProjectPage /></Layout>} />
          <Route path="/admin/setup/vendor" element={<Layout><VendorPage /></Layout>} />
          <Route path="/admin/setup/sensor" element={<Layout><SensorPage /></Layout>} />
          <Route path="/admin/setup/work-center" element={<Layout><WorkCenterPage /></Layout>} />
          <Route path="/admin/settings/data-category" element={<Layout><DataCategoryPage /></Layout>} />
          <Route path="/admin/settings/asset-tag" element={<Layout><AssetTagPage /></Layout>} />
          <Route path="/admin/settings/asset-class" element={<Layout><AssetClassPage /></Layout>} />
          <Route path="/admin/settings/discipline" element={<Layout><DisciplinePage /></Layout>} />
          <Route path="/admin/settings/maintenance-type" element={<Layout><MaintenanceTypePage /></Layout>} />
          <Route path="/admin/settings/frequency-setup" element={<Layout><FrequencySetupPage /></Layout>} />
          <Route path="/admin/settings/average-uars" element={<Layout><AverageUARSPage /></Layout>} />
          <Route path="/admin/settings/corrosion-group" element={<Layout><CorrosionGroupPage /></Layout>} />
          
          {/* Vendor Dashboard */}
          <Route path="/vendor-dashboard" element={<Layout><VendorDashboardPage /></Layout>} />
          
          {/* Integrity Module */}
          <Route path="/integrity" element={<Layout><IntegrityModulePage /></Layout>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
