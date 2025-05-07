
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Wrench } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

// Sample asset performance data
const assetData = {
  totalMaintenanceCost: 876543.21,
  replacementCost: 3456789.10,
  averageRepairCost: 23456.78,
  failureCost: 123456.78,
};

const AssetPerformancePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Asset Performance" 
        icon={<Activity className="h-6 w-6" />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Total Maintenance Cost</span>
              <span className="text-2xl font-bold">{formatCurrency(assetData.totalMaintenanceCost)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Replacement Value</span>
              <span className="text-2xl font-bold">{formatCurrency(assetData.replacementCost)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Average Repair Cost</span>
              <span className="text-2xl font-bold">{formatCurrency(assetData.averageRepairCost)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Failure Cost</span>
              <span className="text-2xl font-bold">{formatCurrency(assetData.failureCost)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="h-5 w-5" />
            <h2 className="text-lg font-medium">Asset Cost Performance</h2>
          </div>
          <p className="text-gray-500">Asset performance metrics with charts will be displayed here, using Malaysian Ringgit (RM) formatting for all monetary values.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetPerformancePage;
