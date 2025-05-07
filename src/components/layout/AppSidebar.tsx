import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart4, Settings, ClipboardList, Wrench, LineChart, Gauge, ChevronRight, Menu, X, Home, Database, Box, ListOrdered, Calendar, Users, ChevronLeft, Monitor } from 'lucide-react';
import { IMSIcon, IntegrityIcon, RBIAssessmentIcon, CorrosionStudiesIcon, InspectionDataIcon, InventoryGroupsIcon, RMSIcon, RMSAssetListIcon, CriticalAssetsIcon, RMSDashboardIcon } from '@/components/ui/custom-icons';
import { cn } from '@/lib/utils';
type SidebarItemType = {
  name: string;
  icon: React.ElementType;
  path?: string;
  children?: {
    name: string;
    path?: string;
    icon: React.ElementType; // Making icon required here to match the type definition
    children?: {
      name: string;
      path: string;
      icon: React.ElementType; // Making icon required here as well
    }[];
  }[];
};

// Sidebar structure
const sidebarItems: SidebarItemType[] = [{
  name: 'Dashboard',
  icon: Home,
  path: '/'
}, {
  name: 'Asset Management',
  icon: Database,
  children: [{
    name: 'Facilities',
    path: '/manage/facilities',
    icon: Database
  }, {
    name: 'System',
    path: '/manage/system',
    icon: Database
  }, {
    name: 'Package',
    path: '/manage/package',
    icon: Database
  }, {
    name: 'Assets',
    path: '/manage/assets',
    icon: Database
  }]
}, {
  name: 'Inventory',
  icon: Box,
  children: [{
    name: 'Material',
    path: '/manage/material',
    icon: Box
  }, {
    name: 'Items Master',
    path: '/manage/items-master',
    icon: Box
  }, {
    name: 'Inventory',
    path: '/manage/inventory',
    icon: Box
  }, {
    name: 'BOM Assembly',
    path: '/manage/bom-assembly',
    icon: Box
  }]
}, {
  name: 'Work Orders',
  icon: ListOrdered,
  children: [{
    name: 'Work Request',
    path: '/maintain/work-request',
    icon: ClipboardList
  }, {
    name: 'Work Order List',
    path: '/maintain/work-order-list',
    icon: ClipboardList
  }, {
    name: 'WO History',
    path: '/maintain/wo-history',
    icon: ClipboardList
  }]
}, {
  name: 'Maintenance Planning',
  icon: Calendar,
  children: [{
    name: 'PM Schedule',
    path: '/maintain/pm-schedule',
    icon: Calendar
  }, {
    name: 'Task Library',
    path: '/maintain/task-library',
    icon: Wrench
  }]
},
// Updated Monitor section with IMS and RMS as children
{
  name: 'Monitor',
  icon: Monitor,
  children: [{
    name: 'IMS',
    icon: IMSIcon,
    children: [{
      name: 'IMS Dashboard',
      path: '/monitor/ims-dashboard',
      icon: IMSIcon
    }, {
      name: 'Integrity',
      path: '/monitor/integrity',
      icon: IntegrityIcon
    }, {
      name: 'RBI Assessment',
      path: '/monitor/rbi-assessment',
      icon: RBIAssessmentIcon
    }, {
      name: 'Corrosion Studies',
      path: '/monitor/corrosion-studies',
      icon: CorrosionStudiesIcon
    }, {
      name: 'Inspection Data Management',
      path: '/monitor/inspection-data',
      icon: InspectionDataIcon
    }, {
      name: 'Inventory Groups',
      path: '/monitor/inventory-groups',
      icon: InventoryGroupsIcon
    }]
  }, {
    name: 'RMS',
    icon: RMSIcon,
    children: [{
      name: 'RMS Asset List',
      path: '/monitor/rms-asset-list',
      icon: RMSAssetListIcon
    }, {
      name: 'Critical Assets Tracking',
      path: '/monitor/critical-assets',
      icon: CriticalAssetsIcon
    }, {
      name: 'RMS Dashboard',
      path: '/monitor/rms-dashboard',
      icon: RMSDashboardIcon
    }]
  }]
}, {
  name: 'Reports & Analytics',
  icon: BarChart4,
  children: [{
    name: 'Asset Performance',
    path: '/measure/asset-performance',
    icon: BarChart4
  }, {
    name: 'Work Analytics',
    path: '/measure/work-analytics',
    icon: BarChart4
  }, {
    name: 'Cost Analysis',
    path: '/measure/cost-analysis',
    icon: BarChart4
  }, {
    name: 'KPI Dashboard',
    path: '/measure/kpi-dashboard',
    icon: BarChart4
  }]
}, {
  name: 'Setup',
  icon: Settings,
  children: [
  // Admin setup items
  {
    name: 'Company',
    path: '/admin/setup/company',
    icon: Settings
  }, {
    name: 'Client',
    path: '/admin/setup/client',
    icon: Settings
  }, {
    name: 'Project',
    path: '/admin/setup/project',
    icon: Settings
  }, {
    name: 'Vendor',
    path: '/admin/setup/vendor',
    icon: Settings
  }, {
    name: 'Sensor',
    path: '/admin/setup/sensor',
    icon: Settings
  }, {
    name: 'Work Center',
    path: '/admin/setup/work-center',
    icon: Settings
  },
  // Admin settings items
  {
    name: 'Data Category',
    path: '/admin/settings/data-category',
    icon: Settings
  }, {
    name: 'Asset Tag',
    path: '/admin/settings/asset-tag',
    icon: Settings
  }, {
    name: 'Asset Class',
    path: '/admin/settings/asset-class',
    icon: Settings
  }, {
    name: 'Discipline',
    path: '/admin/settings/discipline',
    icon: Settings
  }, {
    name: 'Maintenance Type',
    path: '/admin/settings/maintenance-type',
    icon: Settings
  }, {
    name: 'Frequency Setup',
    path: '/admin/settings/frequency-setup',
    icon: Settings
  }, {
    name: 'Average UARS',
    path: '/admin/settings/average-uars',
    icon: Settings
  }, {
    name: 'Corrosion Group',
    path: '/admin/settings/corrosion-group',
    icon: Settings
  }]
}];

// Remove standalone IMS and RMS sections as they're now under Monitor

type SidebarItemProps = {
  item: SidebarItemType;
  isCollapsed: boolean;
  activeItem: string;
  onActiveItemChange: (item: string) => void;
  depth?: number;
};
const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isCollapsed,
  activeItem,
  onActiveItemChange,
  depth = 0
}) => {
  const location = useLocation();
  const isActive = activeItem === item.name || location.pathname === item.path || item.children?.some(child => location.pathname === child.path || child.children?.some(grandchild => location.pathname === grandchild.path));
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

  // Special styling for IMS and RMS sections
  const isSpecialSection = item.name === 'IMS' || item.name === 'RMS';
  const specialSectionClass = isSpecialSection ? 'bg-[#1A1F2C] hover:bg-[#2a314a]' : '';
  return <li className="w-full">
      {item.path ? <Link to={item.path} className={cn('flex items-center py-3 px-4 text-white hover:bg-[#2a314a] w-full transition-colors duration-200', {
      'bg-[#2a314a]': isActive,
      'justify-center': isCollapsed,
      'pl-8': depth === 1,
      'pl-12': depth === 2
    }, specialSectionClass)} onClick={handleClick} title={isCollapsed ? item.name : undefined}>
          <item.icon size={20} className={cn("flex-shrink-0 mr-3", {
        "mr-0": isCollapsed
      })} />
          {!isCollapsed && <>
              <span className="flex-1">{item.name}</span>
              {item.children && <div className="ml-auto">
                  <ChevronRight size={16} />
                </div>}
            </>}
        </Link> : <button className={cn('flex w-full items-center py-3 px-4 text-white hover:bg-[#2a314a] transition-colors duration-200', {
      'bg-[#2a314a]': isActive,
      'justify-center': isCollapsed,
      'pl-8': depth === 1,
      'pl-12': depth === 2
    }, specialSectionClass)} onClick={handleClick} title={isCollapsed ? item.name : undefined}>
          <item.icon size={20} className={cn("flex-shrink-0 mr-3", {
        "mr-0": isCollapsed
      })} />
          {!isCollapsed && <>
              <span className="flex-1">{item.name}</span>
              {item.children && <div className="ml-auto">
                  <ChevronRight size={16} className={cn('transition-transform duration-200', {
            'rotate-90': isSubmenuOpen
          })} />
                </div>}
            </>}
        </button>}

      {isSubmenuOpen && item.children && !isCollapsed && <ul className={cn("bg-[#242b3d] py-1", {
      "bg-[#1A1F2C]": isSpecialSection,
      "bg-[#2a314a]": depth === 1 && !isSpecialSection
    })}>
          {item.children.map((child, index) => {
        if (child.children) {
          // Handle nested submenu (for IMS and RMS under Monitor)
          return <SidebarItem key={child.name} item={child} isCollapsed={isCollapsed} activeItem={activeItem} onActiveItemChange={onActiveItemChange} depth={depth + 1} />;
        }
        return <li key={child.name}>
                <Link to={child.path || '#'} className={cn('flex items-center py-2 px-11 text-sm text-white/80 hover:bg-[#2a314a] hover:text-white transition-colors duration-200', {
            'bg-[#2a314a] text-white': location.pathname === child.path,
            'py-3 px-6': isSpecialSection,
            // Special styling for IMS and RMS submenu items
            'pl-12': depth === 1,
            'pl-16': depth === 2
          })}>
                  {child.icon && <child.icon size={16} className="mr-3 flex-shrink-0" />}
                  <span className="flex-1">{child.name}</span>
                  {child.children && <ChevronRight size={16} />}
                </Link>
              </li>;
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
  return <>
      {isMobile && <button onClick={onToggle} className="fixed top-4 left-4 z-50 p-2 bg-[#1A1F2C] rounded-md text-white hover:bg-[#2a314a] transition-colors duration-200">
          {!isCollapsed ? <X size={20} /> : <Menu size={20} />}
        </button>}
      
      <div className={cn('fixed inset-y-0 left-0 z-40 bg-[#1A1F2C] transition-all duration-300 ease-in-out transform', {
      'w-60': !isCollapsed,
      'w-16': isCollapsed && !isMobile,
      'translate-x-0': !isCollapsed || !isMobile,
      '-translate-x-full': isCollapsed && isMobile
    })}>
        <div className="h-full flex flex-col">
          <div className={cn("flex items-center h-16 px-4 border-b border-white/10", {
          "justify-center": isCollapsed
        })}>
            <div className={cn("flex items-center", {
            "justify-center": isCollapsed
          })}>
              <span className={cn("text-xl font-bold text-white", {
              "sr-only": isCollapsed
            })}>MyEPOMSX</span>
              {isCollapsed && <span className="font-bold text-white text-2xl">E</span>}
            </div>
            
            {!isMobile && <button onClick={onToggle} className={cn("ml-auto p-1 rounded-md text-white hover:bg-[#2a314a] focus:outline-none transition-colors duration-200", {
            "mr-auto ml-0": isCollapsed
          })}>
                {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>}
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <ul className="space-y-0.5">
              {sidebarItems.map((item, index) => <React.Fragment key={item.name}>
                  <SidebarItem item={item} isCollapsed={isCollapsed} activeItem={activeItem} onActiveItemChange={handleActiveItemChange} />
                  {/* Add horizontal separator line after Field Operations and Reports & Analytics */}
                  {index === 4 || index === 5 || index === 6}
                </React.Fragment>)}
            </ul>
          </div>
        </div>
      </div>
    </>;
};
export default AppSidebar;