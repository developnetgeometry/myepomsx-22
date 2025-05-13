
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Package } from 'lucide-react';
import { packages, systems } from '@/data/sampleData';
import { toast } from 'sonner';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const PackageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [packageItem, setPackageItem] = useState<any>(null);
  const [system, setSystem] = useState<any>(null);
  
  useEffect(() => {
    // Simulate API call to fetch package details
    setTimeout(() => {
      const pkg = packages.find(p => p.id === id);
      setPackageItem(pkg);
      if (pkg) {
        setSystem(systems.find(sys => sys.id === pkg.systemId));
      }
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleBack = () => {
    navigate("/manage/package");
  };
  
  const handleEdit = () => {
    toast.info("Edit functionality would open a form to edit this package");
  };
  
  if (loading) {
    return <div className="space-y-6">
      <Breadcrumbs />
      
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-50 p-2 rounded">
          <Package className="h-6 w-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>

      <div className="bg-white border rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>;
  }
  
  if (!packageItem) {
    return <div className="space-y-6">
      <Breadcrumbs />
      
      <div className="bg-white border rounded-lg shadow-sm p-8 text-center">
        <h2 className="text-xl font-medium mb-2">Package Not Found</h2>
        <p className="text-muted-foreground mb-6">The requested package could not be found.</p>
        <Button onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Packages
        </Button>
      </div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      
      {/* Package Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-50 p-2 rounded">
          <Package className="h-6 w-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold">{packageItem.name}</h1>
      </div>
      
      {/* Main Content Card */}
      <div className="bg-white border rounded-lg shadow-sm">
        {/* Header with title and buttons */}
        <div className="p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{packageItem.name}</h2>
            <div className="text-sm text-muted-foreground">Package ID: {packageItem.packageNo || id}</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleEdit}>Edit</Button>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <h3 className="text-lg font-medium mb-4">Basic Information</h3>
              <div className="grid grid-cols-[120px_1fr] gap-y-3 mb-6">
                <div className="text-muted-foreground">Package ID:</div>
                <div className="font-medium">{packageItem.packageNo || id}</div>
                <div className="text-muted-foreground">Name:</div>
                <div className="font-medium">{packageItem.name}</div>
                <div className="text-muted-foreground">Package Tag:</div>
                <div className="font-medium">{packageItem.tag || "N/A"}</div>
                <div className="text-muted-foreground">Type:</div>
                <div className="font-medium">{packageItem.type || "N/A"}</div>
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              <h3 className="text-lg font-medium mb-4">Related Information</h3>
              <div className="grid grid-cols-[120px_1fr] gap-y-3 mb-6">
                <div className="text-muted-foreground">System:</div>
                <div className="font-medium">{system?.name || "N/A"}</div>
                <div className="text-muted-foreground">Facility:</div>
                <div className="font-medium">{packageItem.facility || "Main Facility"}</div>
                <div className="text-muted-foreground">Status:</div>
                <div className="font-medium">{packageItem.status || "Active"}</div>
              </div>
            </div>
          </div>
          
          {/* Package Contents Section */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Package Contents</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                <span className="font-medium">Asset 001</span>
                <span className="text-sm text-muted-foreground">Control Valve</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                <span className="font-medium">Asset 002</span>
                <span className="text-sm text-muted-foreground">Pressure Transmitter</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                <span className="font-medium">Asset 003</span>
                <span className="text-sm text-muted-foreground">Flow Meter</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailPage;
