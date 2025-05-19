
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { FileText, Layers, Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const BomAssemblyPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <BlankPageTemplate
        title="Bill of Materials Assembly"
        subtitle="Manage and view equipment bill of materials and assembly information"
        icon={<FileText className="h-6 w-6" />}
      />
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium">Equipment BOM Overview</h3>
          <div className="mt-4 space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-blue-500" />
                <h4 className="font-medium">Centrifugal Pump Assembly P-101</h4>
              </div>
              <p className="text-sm text-gray-600 mt-1">42 components, last updated 15 days ago</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Layers className="h-5 w-5 text-blue-500" />
                <h4 className="font-medium">Heat Exchanger E-201 Assembly</h4>
              </div>
              <p className="text-sm text-gray-600 mt-1">28 components, last updated 7 days ago</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-blue-500" />
                <h4 className="font-medium">Control Valve Assembly V-303</h4>
              </div>
              <p className="text-sm text-gray-600 mt-1">16 components, last updated 22 days ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BomAssemblyPage;
