
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart4,
  Settings,
  ClipboardList,
  Wrench,
  LineChart,
  Gauge,
  ChevronRight,
  Menu,
  X,
  Home,
  Database,
  Box,
  ListOrdered,
  Calendar,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarItemType = {
  name: string;
  icon: React.ElementType;
  path?: string;
  children?: { name: string; path: string }[];
};

// Map our existing sidebar structure to the new design
const sidebarItems: SidebarItemType[] = [
  {
    name: 'Dashboard',
    icon: Home,
    path: '/',
  },
  {
    name: 'Asset Management',
    icon: Database,
    children: [
      { name: 'Facilities', path: '/manage/facilities' },
      { name: 'System', path: '/manage/system' },
      { name: 'Package', path: '/manage/package' },
      { name: 'Assets', path: '/manage/assets' },
      { name: 'BOM Assembly', path: '/manage/bom-assembly' },
      { name: 'Asset Hierarchy', path: '/manage/asset-hierarchy' },
      { name: 'Asset Register', path: '/manage/asset-register' },
    ],
  },
  {
    name: 'Inventory',
    icon: Box,
    children: [
      { name: 'Material', path: '/manage/material' },
      { name: 'Items Master', path: '/manage/items-master' },
      { name: 'Inventory', path: '/manage/inventory' },
    ],
  },
  {
    name: 'Work Orders',
    icon: ListOrdered,
    children: [
      { name: 'Work Request', path: '/maintain/work-request' },
      { name: 'Work Order List', path: '/maintain/work-order-list' },
      { name: 'WO History', path: '/maintain/wo-history' },
    ],
  },
  {
    name: 'Maintenance Planning',
    icon: Calendar,
    children: [
      { name: 'PM Schedule', path: '/maintain/pm-schedule' },
      { name: 'Task Library', path: '/maintain/task-library' },
    ],
  },
  {
    name: 'Field Operations',
    icon: Users,
    children: [
      { name: 'IMS Dashboard', path: '/monitor/ims-dashboard' },
      { name: 'RBI Assessment', path: '/monitor/rbi-assessment' },
      { name: 'Corrosion Studies', path: '/monitor/corrosion-studies' },
      { name: 'Inspection Data', path: '/monitor/inspection-data' },
      { name: 'Inventory Groups', path: '/monitor/inventory-groups' },
      { name: 'RMS Asset List', path: '/monitor/rms-asset-list' },
      { name: 'Critical Assets', path: '/monitor/critical-assets' },
      { name: 'RMS Dashboard', path: '/monitor/rms-dashboard' },
    ],
  },
  {
    name: 'Reports & Analytics',
    icon: BarChart4,
    children: [
      { name: 'Asset Performance', path: '/measure/asset-performance' },
      { name: 'Work Analytics', path: '/measure/work-analytics' },
      { name: 'Cost Analysis', path: '/measure/cost-analysis' },
      { name: 'KPI Dashboard', path: '/measure/kpi-dashboard' },
    ],
  },
  {
    name: 'Setup',
    icon: Settings,
    children: [
      // Admin setup items
      { name: 'Company', path: '/admin/setup/company' },
      { name: 'Client', path: '/admin/setup/client' },
      { name: 'Project', path: '/admin/setup/project' },
      { name: 'Vendor', path: '/admin/setup/vendor' },
      { name: 'Sensor', path: '/admin/setup/sensor' },
      { name: 'Work Center', path: '/admin/setup/work-center' },
      // Admin settings items
      { name: 'Data Category', path: '/admin/settings/data-category' },
      { name: 'Asset Tag', path: '/admin/settings/asset-tag' },
      { name: 'Asset Class', path: '/admin/settings/asset-class' },
      { name: 'Discipline', path: '/admin/settings/discipline' },
      { name: 'Maintenance Type', path: '/admin/settings/maintenance-type' },
      { name: 'Frequency Setup', path: '/admin/settings/frequency-setup' },
      { name: 'Average UARS', path: '/admin/settings/average-uars' },
      { name: 'Corrosion Group', path: '/admin/settings/corrosion-group' },
    ],
  },
];

type SidebarItemProps = {
  item: SidebarItemType;
  isOpen: boolean;
  activeItem: string;
  onActiveItemChange: (item: string) => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  item, 
  isOpen, 
  activeItem, 
  onActiveItemChange 
}) => {
  const location = useLocation();
  const isActive = activeItem === item.name || 
                   location.pathname === item.path || 
                   (item.children?.some(child => location.pathname === child.path));
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(isActive);

  React.useEffect(() => {
    if (isActive && isOpen) {
      setIsSubmenuOpen(true);
    } else if (!isOpen) {
      setIsSubmenuOpen(false);
    }
  }, [isActive, isOpen]);

  const handleClick = () => {
    if (item.children) {
      setIsSubmenuOpen(!isSubmenuOpen);
      onActiveItemChange(item.name);
    } else if (item.path) {
      onActiveItemChange(item.name);
    }
  };

  return (
    <li className="w-full">
      {item.path ? (
        <Link
          to={item.path}
          className={cn(
            'flex items-center py-3 px-4 text-white hover:bg-[#2a314a] w-full',
            {
              'bg-[#2a314a]': isActive,
            }
          )}
          onClick={handleClick}
        >
          <item.icon size={20} className="flex-shrink-0 mr-3" />
          <span className="flex-1">{item.name}</span>
          {item.children && (
            <div className="ml-auto">
              <ChevronRight size={16} />
            </div>
          )}
        </Link>
      ) : (
        <button
          className={cn(
            'flex w-full items-center py-3 px-4 text-white hover:bg-[#2a314a]',
            {
              'bg-[#2a314a]': isActive,
            }
          )}
          onClick={handleClick}
        >
          <item.icon size={20} className="flex-shrink-0 mr-3" />
          <span className="flex-1">{item.name}</span>
          {item.children && (
            <div className="ml-auto">
              <ChevronRight size={16} />
            </div>
          )}
        </button>
      )}
      {isSubmenuOpen && item.children && isOpen && (
        <ul className="bg-[#242b3d] py-1">
          {item.children.map((child) => (
            <li key={child.name}>
              <Link
                to={child.path}
                className={cn(
                  'flex items-center py-2 px-11 text-sm text-white/80 hover:bg-[#2a314a] hover:text-white',
                  {
                    'bg-[#2a314a] text-white': location.pathname === child.path,
                  }
                )}
              >
                <span className="flex-1">{child.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

type AppSidebarProps = {
  isMobile: boolean;
};

const AppSidebar: React.FC<AppSidebarProps> = ({ isMobile }) => {
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [activeItem, setActiveItem] = useState('Dashboard');
  
  const handleActiveItemChange = (item: string) => {
    setActiveItem(item);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-[#1A1F2C] rounded-md text-white"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 bg-[#1A1F2C] transition-all duration-300 ease-in-out transform w-60',
          {
            'translate-x-0': isOpen,
            '-translate-x-full': !isOpen && isMobile,
          }
        )}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center h-16 px-4 border-b border-white/10">
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">iWorx</span>
            </div>
            {isOpen && !isMobile && (
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto p-1 rounded-md text-white hover:bg-[#2a314a] focus:outline-none"
              >
                <Menu size={20} />
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto">
            <ul className="space-y-0.5">
              {sidebarItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  <SidebarItem
                    item={item}
                    isOpen={isOpen}
                    activeItem={activeItem}
                    onActiveItemChange={handleActiveItemChange}
                  />
                  {/* Add horizontal separator line after Reports & Analytics */}
                  {index === 6 && (
                    <li className="border-b border-white/10 my-1"></li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppSidebar;
