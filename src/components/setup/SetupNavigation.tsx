
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Building, User, Ship, Wrench, Thermometer, Tools } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

type SetupNavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const setupNavItems: SetupNavItem[] = [
  {
    name: 'Company',
    path: '/admin/setup/company',
    icon: <Building className="mr-2 h-4 w-4" />
  },
  {
    name: 'Client',
    path: '/admin/setup/client',
    icon: <User className="mr-2 h-4 w-4" />
  },
  {
    name: 'Project',
    path: '/admin/setup/project',
    icon: <Ship className="mr-2 h-4 w-4" />
  },
  {
    name: 'Vendor',
    path: '/admin/setup/vendor',
    icon: <Wrench className="mr-2 h-4 w-4" />
  },
  {
    name: 'Sensor',
    path: '/admin/setup/sensor',
    icon: <Thermometer className="mr-2 h-4 w-4" />
  },
  {
    name: 'Work Center',
    path: '/admin/setup/work-center',
    icon: <Tools className="mr-2 h-4 w-4" />
  }
];

const SetupNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="mb-8">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-wrap gap-2">
          {setupNavItems.map((item) => (
            <NavigationMenuItem key={item.name}>
              <Link to={item.path}>
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "flex items-center",
                    currentPath === item.path ? "bg-accent text-accent-foreground" : ""
                  )}
                >
                  {item.icon}
                  {item.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default SetupNavigation;
