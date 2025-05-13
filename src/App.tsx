
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import FacilitiesPage from './pages/manage/FacilitiesPage';
import FacilityDetailPage from './pages/manage/FacilityDetailPage';
import SystemPage from './pages/manage/SystemPage';
import SystemDetailPage from './pages/manage/SystemDetailPage';
import PackagePage from './pages/manage/PackagePage';
import PackageDetailPage from './pages/manage/PackageDetailPage';
import AssetRegisterPage from './pages/manage/AssetRegisterPage';
import AssetRegisterDetailPage from './pages/manage/AssetRegisterDetailPage';
import ClientPage from './pages/admin/setup/ClientPage';
import ClientDetailPage from './pages/admin/setup/ClientDetailPage';
import ProjectPage from './pages/admin/setup/ProjectPage';
import ProjectDetailPage from './pages/admin/setup/ProjectDetailPage';
import WorkCenterPage from './pages/admin/setup/WorkCenterPage';
import WorkCenterDetailPage from './pages/admin/setup/WorkCenterDetailPage';
import VendorPage from './pages/admin/setup/VendorPage';
import VendorDetailPage from './pages/admin/setup/VendorDetailPage';
import SensorPage from './pages/admin/setup/SensorPage';
import SensorDetailPage from './pages/admin/setup/SensorDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Index /></Layout>} />
        
        {/* Manage Routes */}
        <Route path="/manage/facilities" element={<Layout><FacilitiesPage /></Layout>} />
        <Route path="/manage/facilities/:id" element={<Layout><FacilityDetailPage /></Layout>} />
        <Route path="/manage/system" element={<Layout><SystemPage /></Layout>} />
        <Route path="/manage/system/:id" element={<Layout><SystemDetailPage /></Layout>} />
        <Route path="/manage/package" element={<Layout><PackagePage /></Layout>} />
        <Route path="/manage/package/:id" element={<Layout><PackageDetailPage /></Layout>} />
        <Route path="/manage/asset-register" element={<Layout><AssetRegisterPage /></Layout>} />
        <Route path="/manage/asset-register/:id" element={<Layout><AssetRegisterDetailPage /></Layout>} />
        
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
        
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
