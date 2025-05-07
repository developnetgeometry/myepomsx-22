
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, BarChart, PieChart } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

// Sample work analytics data
const analyticsData = {
  laborCosts: 567890.12,
  materialCosts: 456789.23,
  totalWorkOrderValue: 1024679.35,
  averageWorkOrderValue: 8345.67,
};

const WorkAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Work Analytics" 
        icon={<LineChart className="h-6 w-6" />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Labor Costs</span>
              <span className="text-2xl font-bold">{formatCurrency(analyticsData.laborCosts)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Material Costs</span>
              <span className="text-2xl font-bold">{formatCurrency(analyticsData.materialCosts)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Total Work Order Value</span>
              <span className="text-2xl font-bold">{formatCurrency(analyticsData.totalWorkOrderValue)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Avg. Work Order Value</span>
              <span className="text-2xl font-bold">{formatCurrency(analyticsData.averageWorkOrderValue)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Work Order Costs</h2>
              <BarChart className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-gray-500">Chart showing work order costs with Malaysian Ringgit (RM) formatting will be displayed here.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Cost Distribution</h2>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-gray-500">Chart showing cost distribution with Malaysian Ringgit (RM) formatting will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkAnalyticsPage;
