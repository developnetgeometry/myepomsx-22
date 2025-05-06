
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart4, Settings, ClipboardList, Wrench, LineChart, Gauge, ChevronRight, Menu, X, Home, Database, Box, ListOrdered, Calendar, Users, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarItemType = {
  name: string;
  icon: React.ElementType;
  path?: string;
  children?: {
    name: string;
    path: string;
  }[];
};

// Map our existing sidebar structure to the new design
const sidebarItems: SidebarItemType[] = [
  {
    name: 'Dashboard',
    icon: Home,
    path: '/'
  }, 
  {
    name: 'Asset Management',
    icon: Database,
    children: [
      { name: 'Facilities', path: '/manage/facilities' },
      { name: 'System', path: '/manage/system' },
      { name: 'Package', path: '/manage/package' },
      { name: 'Assets', path: '/manage/assets' },
      { name: 'Asset Register', path: '/manage/asset-register' }
    ]
  },
  {
    name: 'Inventory',
    icon: Box,
    children: [
      { name: 'Material', path: '/manage/material' },
      { name: 'Items Master', path: '/manage/items-master' },
      { name: 'Inventory', path: '/manage/inventory' },
      { name: 'BOM Assembly', path: '/manage/bom-assembly' }
    ]
  },
  {
    name: 'Work Orders',
    icon: ListOrdered,
    children: [
      { name: 'Work Request', path: '/maintain/work-request' },
      { name: 'Work Order List', path: '/maintain/work-order-list' },
      { name: 'WO History', path: '/maintain/wo-history' }
    ]
  },
  {
    name: 'Maintenance Planning',
    icon: Calendar,
    children: [
      { name: 'PM Schedule', path: '/maintain/pm-schedule' },
      { name: 'Task Library', path: '/maintain/task-library' }
    ]
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
      { name: 'RMS Dashboard', path: '/monitor/rms-dashboard' }
    ]
  },
  {
    name: 'Reports & Analytics',
    icon: BarChart4,
    children: [
      { name: 'Asset Performance', path: '/measure/asset-performance' },
      { name: 'Work Analytics', path: '/measure/work-analytics' },
      { name: 'Cost Analysis', path: '/measure/cost-analysis' },
      { name: 'KPI Dashboard', path: '/measure/kpi-dashboard' }
    ]
  },
  {
    name: 'Setup',
    icon: Settings,
    children: [
      // Admin setup items
      {
        name: 'Company',
        path: '/admin/setup/company'
      }, {
        name: 'Client',
        path: '/admin/setup/client'
      }, {
        name: 'Project',
        path: '/admin/setup/project'
      }, {
        name: 'Vendor',
        path: '/admin/setup/vendor'
      }, {
        name: 'Sensor',
        path: '/admin/setup/sensor'
      }, {
        name: 'Work Center',
        path: '/admin/setup/work-center'
      },
      // Admin settings items
      {
        name: 'Data Category',
        path: '/admin/settings/data-category'
      }, {
        name: 'Asset Tag',
        path: '/admin/settings/asset-tag'
      }, {
        name: 'Asset Class',
        path: '/admin/settings/asset-class'
      }, {
        name: 'Discipline',
        path: '/admin/settings/discipline'
      }, {
        name: 'Maintenance Type',
        path: '/admin/settings/maintenance-type'
      }, {
        name: 'Frequency Setup',
        path: '/admin/settings/frequency-setup'
      }, {
        name: 'Average UARS',
        path: '/admin/settings/average-uars'
      }, {
        name: 'Corrosion Group',
        path: '/admin/settings/corrosion-group'
      }]
  }
];

type SidebarItemProps = {
  item: SidebarItemType;
  isCollapsed: boolean;
  activeItem: string;
  onActiveItemChange: (item: string) => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isCollapsed,
  activeItem,
  onActiveItemChange
}) => {
  const location = useLocation();
  const isActive = activeItem === item.name || location.pathname === item.path || item.children?.some(child => location.pathname === child.path);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(isActive);

  React.useEffect(() => {
    // Only auto-expand menus when sidebar is not collapsed
    if (isActive && !isCollapsed) {
      setIsSubmenuOpen(true);
    } else if (isCollapsed) {
      setIsSubmenuOpen(false);
    }
  }, [isActive, isCollapsed]);

  const handleClick = () => {
    if (item.children) {
      if (!isCollapsed) {
        setIsSubmenuOpen(!isSubmenuOpen);
      }
      onActiveItemChange(item.name);
    } else if (item.path) {
      onActiveItemChange(item.name);
    }
  };

  return <li className="w-full">
      {item.path ? <Link to={item.path} className={cn('flex items-center py-3 px-4 text-white hover:bg-sidebar-accent w-full transition-colors duration-200', {
      'bg-sidebar-accent text-white': isActive,
      'justify-center': isCollapsed
    })} onClick={handleClick} title={isCollapsed ? item.name : undefined}>
          <item.icon size={20} className={cn("flex-shrink-0 mr-3", isActive ? "text-white" : "text-white")} />
          {!isCollapsed && <>
              <span className="flex-1">{item.name}</span>
              {item.children && <div className="ml-auto">
                  <ChevronRight size={16} className="text-white" />
                </div>}
            </>}
        </Link> : <button className={cn('flex w-full items-center py-3 px-4 text-white hover:bg-sidebar-accent transition-colors duration-200', {
      'bg-sidebar-accent text-white': isActive,
      'justify-center': isCollapsed
    })} onClick={handleClick} title={isCollapsed ? item.name : undefined}>
          <item.icon size={20} className={cn("flex-shrink-0 mr-3", isActive ? "text-white" : "text-white")} />
          {!isCollapsed && <>
              <span className="flex-1">{item.name}</span>
              {item.children && <div className="ml-auto">
                  <ChevronRight size={16} className={cn('transition-transform duration-200', {
            'rotate-90': isSubmenuOpen,
            'text-white': isActive
          })} />
                </div>}
            </>}
        </button>}
      {isSubmenuOpen && item.children && !isCollapsed && <ul className="bg-sidebar-background py-1">
          {item.children.map(child => {
            const isChildActive = location.pathname === child.path;
            return (
              <li key={child.name}>
                <Link to={child.path} className={cn('flex items-center py-2 px-11 text-sm text-white/80 hover:bg-sidebar-accent hover:text-white transition-colors duration-200', {
                  'bg-sidebar-accent text-white': isChildActive
                })}>
                  <span className={cn("flex-1", { "text-white": isChildActive })}>
                    {child.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>}
    </li>;
};

type AppSidebarProps = {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobile: boolean;
};

const AppSidebar: React.FC<AppSidebarProps> = ({
  isCollapsed,
  onToggle,
  isMobile
}) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  
  const handleActiveItemChange = (item: string) => {
    setActiveItem(item);
    if (isMobile) {
      onToggle();
    }
  };

  return (
    <>
      {isMobile && (
        <button 
          onClick={onToggle} 
          className="fixed top-4 left-4 z-50 p-2 bg-sidebar-background rounded-md text-white"
        >
          {!isCollapsed ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
      
      <div className={cn(
        'fixed inset-y-0 left-0 z-40 bg-sidebar-background shadow-lg transition-all duration-300 ease-in-out transform', 
        {
          'w-60': !isCollapsed,
          'w-16': isCollapsed && !isMobile,
          'translate-x-0': !isCollapsed || !isMobile,
          '-translate-x-full': isCollapsed && isMobile
        }
      )}>
        <div className="h-full flex flex-col">
          <div className={cn(
            "flex items-center h-16 px-4 border-b border-sidebar-border", 
            { "justify-center": isCollapsed }
          )}>
            <div className={cn(
              "flex items-center", 
              { "justify-center": isCollapsed }
            )}>
              {!isCollapsed && (
                <span className="text-xl font-bold text-white">
                  MyEPOMSX
                </span>
              )}
              {isCollapsed && (
                <span className="font-bold text-white text-2xl">
                  E
                </span>
              )}
            </div>
            
            {!isMobile && (
              <button 
                onClick={onToggle} 
                className={cn(
                  "ml-auto p-1 rounded-md text-white hover:bg-sidebar-accent focus:outline-none transition-colors duration-200", 
                  { "mr-auto ml-0": isCollapsed }
                )}
              >
                {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <ul className="space-y-0.5 py-2">
              {sidebarItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  <SidebarItem 
                    item={item} 
                    isCollapsed={isCollapsed} 
                    activeItem={activeItem} 
                    onActiveItemChange={handleActiveItemChange} 
                  />
                  {/* Add horizontal separator line after Reports & Analytics */}
                  {index === 6 && <li className="border-b-2 border-sidebar-border my-2 mx-4"></li>}
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
