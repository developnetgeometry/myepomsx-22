
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";

// Map of path segments to display names
const pathMap: Record<string, string> = {
  "admin": "Admin",
  "setup": "Setup",
  "settings": "Settings",
  "manage": "Manage",
  "maintain": "Maintain",
  "measure": "Measure",
  "monitor": "Monitor",
  "integrity": "Integrity",
  "vendor": "Vendor",
  "assets": "Assets",
  "asset-hierarchy": "Asset Hierarchy",
  "asset-register": "Asset Register",
  "bom-assembly": "BOM Assembly",
  "facilities": "Facilities",
  "inventory": "Inventory",
  "items-master": "Items Master",
  "material": "Material",
  "package": "Package",
  "parts-inventory": "Parts Inventory",
  "system": "System",
  "rms-asset-list": "RMS Asset List",
  // Add more mappings as needed
};

// Function to format segment to readable text
const formatSegment = (segment: string): string => {
  if (pathMap[segment]) return pathMap[segment];
  
  // If segment is an ID (typically in a details page)
  if (/^\d+$/.test(segment)) {
    return "Details";
  }
  
  // Convert kebab-case to Title Case
  return segment
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

interface BreadcrumbsProps {
  showHome?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ showHome = true }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(segment => segment);
  
  // Handle root path
  if (pathSegments.length === 0) {
    return null;
  }
  
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {showHome && (
          <>
            <BreadcrumbItem key="home">
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          let displayName = formatSegment(segment);
          
          // Special handling for detail pages (when the last segment is an ID)
          if (isLast && /^\d+$/.test(segment)) {
            displayName = "Details";
          }
          
          return (
            <React.Fragment key={path}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{displayName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={path}>{displayName}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
