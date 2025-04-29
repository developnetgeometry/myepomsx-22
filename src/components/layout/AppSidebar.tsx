
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart4,
  Settings,
  ClipboardList,
  Wrench,
  LineChart,
  Gauge,
  Users,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarItemType = {
  name: string;
  icon: React.ElementType;
  path?: string;
  children?: { name: string; path: string }[];
};

const sidebarItems: SidebarItemType[] = [
  {
    name: 'Overview',
    icon: BarChart4,
    path: '/',
  },
  {
    name: 'Manage',
    icon: ClipboardList,
    children: [
      { name: 'Asset Register', path: '/manage/asset-register' },
      { name: 'Asset Hierarchy', path: '/manage/asset-hierarchy' },
      { name: 'Parts & Inventory', path: '/manage/parts-inventory' },
    ],
  },
  {
    name: 'Maintain',
    icon: Wrench,
    children: [
      { name: 'PM Schedule', path: '/maintain/pm-schedule' },
      { name: 'Work Request', path: '/maintain/work-request' },
      { name: 'Work Order List', path: '/maintain/work-order-list' },
      { name: 'Task Library', path: '/maintain/task-library' },
      { name: 'WO History', path: '/maintain/wo-history' },
    ],
  },
  {
    name: 'Monitor',
    icon: Gauge,
    children: [
      { name: 'IMS Dashboard', path: '/monitor/ims-dashboard' },
      { name: 'Integrity', path: '/monitor/integrity' },
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
    name: 'Measure',
    icon: LineChart,
    children: [
      { name: 'Asset Performance', path: '/measure/asset-performance' },
      { name: 'Work Analytics', path: '/measure/work-analytics' },
      { name: 'Cost Analysis', path: '/measure/cost-analysis' },
      { name: 'KPI Dashboard', path: '/measure/kpi-dashboard' },
    ],
  },
  {
    name: 'Admin',
    icon: Settings,
    children: [
      { name: 'Company', path: '/admin/setup/company' },
      { name: 'Client', path: '/admin/setup/client' },
      { name: 'Project', path: '/admin/setup/project' },
      { name: 'Vendor', path: '/admin/setup/vendor' },
      { name: 'Sensor', path: '/admin/setup/sensor' },
      { name: 'Work Center', path: '/admin/setup/work-center' },
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
  {
    name: 'Vendor Dashboard',
    icon: Users,
    path: '/vendor-dashboard',
  },
  {
    name: 'Integrity',
    icon: ShieldCheck,
    path: '/integrity',
  },
];

type SidebarItemProps = {
  item: SidebarItemType;
  expanded: boolean;
  isOpen: boolean;
  activeItem: string;
  onActiveItemChange: (item: string) => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  item, 
  expanded, 
  isOpen, 
  activeItem, 
  onActiveItemChange 
}) => {
  const location = useLocation();
  const isActive = activeItem === item.name || 
                   location.pathname === item.path || 
                   (item.children?.some(child => location.pathname === child.path));
  const isExpanded = isActive && expanded;
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(isExpanded);

  React.useEffect(() => {
    if (isActive && expanded) {
      setIsSubmenuOpen(true);
    } else if (!expanded) {
      setIsSubmenuOpen(false);
    }
  }, [isActive, expanded]);

  const handleClick = () => {
    if (item.children) {
      setIsSubmenuOpen(!isSubmenuOpen);
      onActiveItemChange(item.name);
    } else if (item.path) {
      onActiveItemChange(item.name);
    }
  };

  return (
    <li>
      {item.path ? (
        <Link
          to={item.path}
          className={cn(
            'flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 group transition-all duration-200',
            {
              'bg-epomsx-primary text-white hover:bg-epomsx-primary-dark': isActive,
              'justify-center': !isOpen,
              'justify-start': isOpen,
            }
          )}
          onClick={handleClick}
        >
          <div className={cn('flex items-center', {'justify-center w-full': !isOpen})}>
            <item.icon size={20} className={cn('flex-shrink-0', {'mr-3': isOpen})} />
            {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
          </div>
          {isOpen && item.children && (
            <div className="ml-auto">
              {isSubmenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          )}
        </Link>
      ) : (
        <button
          className={cn(
            'flex w-full items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 group transition-all duration-200',
            {
              'bg-epomsx-primary text-white hover:bg-epomsx-primary-dark': isActive,
              'justify-center': !isOpen,
              'justify-start': isOpen,
            }
          )}
          onClick={handleClick}
        >
          <div className={cn('flex items-center', {'justify-center w-full': !isOpen})}>
            <item.icon size={20} className={cn('flex-shrink-0', {'mr-3': isOpen})} />
            {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
          </div>
          {isOpen && item.children && (
            <div className="ml-auto">
              {isSubmenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          )}
        </button>
      )}
      {isSubmenuOpen && item.children && isOpen && (
        <ul className="py-2 space-y-1 pl-8">
          {item.children.map((child) => (
            <li key={child.name}>
              <Link
                to={child.path}
                className={cn(
                  'flex items-center p-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100',
                  {
                    'bg-gray-100 text-epomsx-primary': location.pathname === child.path,
                  }
                )}
              >
                <span className="flex-1 whitespace-nowrap">{child.name}</span>
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
  const [activeItem, setActiveItem] = useState('Overview');
  
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
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-lg border border-gray-200"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out transform',
          {
            'translate-x-0': isOpen,
            '-translate-x-full': !isOpen && isMobile,
            'w-64': isOpen,
            'w-[4.5rem]': !isOpen && !isMobile,
          }
        )}
      >
        <div className="h-full flex flex-col">
          <div className={cn('flex items-center h-16 px-4 border-b border-gray-200', {
            'justify-center': !isOpen,
            'justify-between': isOpen,
          })}>
            {isOpen ? (
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-epomsx-primary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-lg font-semibold text-gray-800">MyEPOMSX</span>
              </div>
            ) : (
              <div className="h-8 w-8 rounded-md bg-epomsx-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
            )}
            {isOpen && !isMobile && (
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100 focus:outline-none"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto py-3">
            <ul className="space-y-2 px-3">
              {sidebarItems.map((item) => (
                <SidebarItem
                  key={item.name}
                  item={item}
                  expanded={isOpen}
                  isOpen={isOpen}
                  activeItem={activeItem}
                  onActiveItemChange={handleActiveItemChange}
                />
              ))}
            </ul>
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-center">
            {!isMobile && !isOpen && (
              <button
                onClick={() => setIsOpen(true)}
                className="p-1 rounded-md hover:bg-gray-100 focus:outline-none"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppSidebar;
