
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import Header from './Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const getPageTitle = (pathname: string): string => {
  const paths = pathname.split('/').filter(Boolean);
  
  if (paths.length === 0) return 'Dashboard';
  
  // Extract the last segment and format it
  const lastSegment = paths[paths.length - 1];
  return lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pageTitle = getPageTitle(location.pathname);

  useEffect(() => {
    setIsSidebarCollapsed(isMobile);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppSidebar isMobile={isMobile} />
      
      <div className={cn(
        "transition-all duration-300 min-h-screen",
        isMobile ? "ml-0" : (isSidebarCollapsed ? "ml-16" : "ml-60")
      )}>
        <Header 
          title={pageTitle} 
          isSidebarOpen={!isSidebarCollapsed} 
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
