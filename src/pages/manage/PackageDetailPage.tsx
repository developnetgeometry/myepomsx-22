
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Package } from 'lucide-react';
import { packages, systems } from '@/data/sampleData';

const PackageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the package in sample data
  const packageItem = packages.find(pkg => pkg.id === id);
  const system = packageItem ? systems.find(sys => sys.id === packageItem.systemId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Package Detail" 
          icon={<Package className="h-6 w-6" />}
        />
        <Button variant="outline" onClick={() => navigate('/manage/package')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Packages
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Package #{packageItem?.packageNo || id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Package ID</h3>
              <p className="text-base">{packageItem?.packageNo || id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Package Name</h3>
              <p className="text-base">{packageItem?.name || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Package Tag</h3>
              <p className="text-base">{packageItem?.tag || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">System</h3>
              <p className="text-base">{system?.name || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Package Type</h3>
              <p className="text-base">{packageItem?.type || "N/A"}</p>
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Package Contents</h3>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">This package contains various assets and equipment necessary for the system operation.</p>
                <div className="mt-4 space-y-2">
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
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageDetailPage;
