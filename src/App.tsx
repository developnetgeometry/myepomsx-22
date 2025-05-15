import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import { ProjectProvider } from './contexts/ProjectContext';

function App() {
  return (
    <ProjectProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            {/* Manage Routes */}
            <Route path="/manage/facilities" element={<Layout><FacilitiesPage /></Layout>} />
            <Route path="/manage/facilities/:id" element={<Layout><FacilityDetailPage /></Layout>} />
            <Route path="/manage/system" element={<Layout><SystemPage /></Layout>} />
            <Route path="/manage/system/:id" element={<Layout><SystemDetailPage /></Layout>} />
            <Route path="/manage/package" element={<Layout><PackagePage /></Layout>} />
            <Route path="/manage/package/:id" element={<Layout><PackageDetailPage /></Layout>} />
            <Route path="/manage/asset-register" element={<Layout><AssetRegisterPage /></Layout>} />
            <Route path="/manage/asset-register/:id" element={<Layout><AssetRegisterDetailPage /></Layout>} />
            <Route path="/manage/assets" element={<Layout><AssetsPage /></Layout>} />
            <Route path="/manage/assets/:id" element={<Layout><AssetDetailPage /></Layout>} />
            <Route path="/manage/bom-assembly" element={<Layout><BomAssemblyPage /></Layout>} />
            <Route path="/manage/bom-assembly/:id" element={<Layout><BomAssemblyDetailPage /></Layout>} />
            <Route path="/manage/items-master" element={<Layout><ItemsMasterPage /></Layout>} />
            <Route path="/manage/items-master/:id" element={<Layout><ItemsMasterDetailPage /></Layout>} />
            <Route path="/manage/inventory" element={<Layout><InventoryPage /></Layout>} />
            <Route path="/manage/inventory/:id" element={<Layout><InventoryDetailPage /></Layout>} />
            <Route path="/manage/inventory/item/:id" element={<Layout><InventoryItemDetailPage /></Layout>} />
            
            {/* Admin Setup Routes */}
            <Route path="/admin/setup/client" element={<Layout><ClientPage /></Layout>} />
            <Route path="/admin/setup/client/:id" element={<Layout><ClientDetailPage /></Layout>} />
            <Route path="/admin/setup/project" element={<Layout><ProjectPage /></Layout>} />
            <Route path="/admin/setup/project/:id" element={<Layout><ProjectDetailPage /></Layout>} />
            <Route path="/admin/setup/work-center" element={<Layout><WorkCenterPage /></Layout>} />
            <Route path="/admin/setup/work-center/:id" element={<Layout><WorkCenterDetailPage /></Layout>} />
            <Route path="/admin/setup/vendor" element={<Layout><VendorPage /></Layout>} />
            <Route path="/admin/setup/vendor/:id" element={<Layout><VendorDetailPage /></Layout>} />
            <Route path="/admin/setup/sensor" element={<Layout><SensorPage /></Layout>} />
            <Route path="/admin/setup/sensor/:id" element={<Layout><SensorDetailPage /></Layout>} />
            
            {/* Admin Settings Routes */}
            <Route path="/admin/settings/asset-class" element={<Layout><AssetClassPage /></Layout>} />
            <Route path="/admin/settings/asset-class/:id" element={<Layout><AssetClassDetailPage /></Layout>} />
            <Route path="/admin/settings/asset-tag" element={<Layout><AssetTagPage /></Layout>} />
            <Route path="/admin/settings/asset-tag/:id" element={<Layout><AssetTagDetailPage /></Layout>} />
            <Route path="/admin/settings/corrosion-group" element={<Layout><CorrosionGroupPage /></Layout>} />
            <Route path="/admin/settings/corrosion-group/:id" element={<Layout><CorrosionGroupDetailPage /></Layout>} />
            <Route path="/admin/settings/data-category" element={<Layout><DataCategoryPage /></Layout>} />
            <Route path="/admin/settings/data-category/:id" element={<Layout><DataCategoryDetailPage /></Layout>} />
            <Route path="/admin/settings/discipline" element={<Layout><DisciplinePage /></Layout>} />
            <Route path="/admin/settings/discipline/:id" element={<Layout><DisciplineDetailPage /></Layout>} />
            <Route path="/admin/settings/frequency-setup" element={<Layout><FrequencySetupPage /></Layout>} />
            <Route path="/admin/settings/frequency-setup/:id" element={<Layout><FrequencySetupDetailPage /></Layout>} />
            <Route path="/admin/settings/maintenance-type" element={<Layout><MaintenanceTypePage /></Layout>} />
            <Route path="/admin/settings/maintenance-type/:id" element={<Layout><MaintenanceTypeDetailPage /></Layout>} />
            <Route path="/admin/settings/average-uars" element={<Layout><AverageUARSPage /></Layout>} />
            <Route path="/admin/settings/average-uars/:id" element={<Layout><AverageUARSDetailPage /></Layout>} />
            
            {/* Integrity Routes */}
            <Route path="/integrity/module" element={<Layout><IntegrityModulePage /></Layout>} />
            
            {/* Monitor Routes */}
            <Route path="/monitor/inventory-groups" element={<Layout><InventoryGroupsPage /></Layout>} />
            <Route path="/monitor/integrity" element={<Layout><IntegrityPage /></Layout>} />
            <Route path="/monitor/integrity/:type/:id" element={<Layout><AssetIntegrityDetailPage /></Layout>} />
            <Route path="/monitor/ims-dashboard" element={<Layout><IMSDashboardPage /></Layout>} />
            <Route path="/monitor/rbi-assessment" element={<Layout><RBIAssessmentPage /></Layout>} />
            <Route path="/monitor/rbi-assessment/:id" element={<Layout><RBIAssessmentDetailPage /></Layout>} />
            <Route path="/monitor/corrosion-studies" element={<Layout><CorrosionStudiesPage /></Layout>} />
            <Route path="/monitor/corrosion-studies/:id" element={<Layout><CorrosionStudiesDetailPage /></Layout>} />
            <Route path="/monitor/inspection-data" element={<Layout><InspectionDataPage /></Layout>} />
            <Route path="/monitor/rms-asset-list" element={<Layout><RMSAssetListPage /></Layout>} />
            <Route path="/monitor/rms-asset-detail/:id" element={<Layout><RMSAssetDetailPage /></Layout>} />
            <Route path="/monitor/critical-assets" element={<Layout><CriticalAssetsPage /></Layout>} />
            <Route path="/monitor/rms-dashboard" element={<Layout><RMSDashboardPage /></Layout>} />
            
            {/* Maintain Routes */}
            <Route path="/maintain/wo-history" element={<Layout><WOHistoryPage /></Layout>} />
            <Route path="/maintain/wo-history/:id" element={<Layout><WOHistoryDetailPage /></Layout>} />
            <Route path="/maintain/task-library" element={<Layout><TaskLibraryPage /></Layout>} />
            <Route path="/maintain/task-library/:id" element={<Layout><TaskLibraryDetailPage /></Layout>} />
            <Route path="/maintain/pm-schedule" element={<Layout><PMSchedulePage /></Layout>} />
            <Route path="/maintain/pm-schedule/:id" element={<Layout><PMScheduleDetailPage /></Layout>} />
            <Route path="/maintain/work-request" element={<Layout><WorkRequestPage /></Layout>} />
            <Route path="/maintain/work-request/:id" element={<Layout><WorkRequestDetailPage /></Layout>} />
            <Route path="/maintain/work-order-list" element={<Layout><WorkOrderListPage /></Layout>} />
            <Route path="/maintain/work-order-list/:id" element={<Layout><WorkOrderDetailPage /></Layout>} />
            
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </ProjectProvider>
  );
}

export default App;
