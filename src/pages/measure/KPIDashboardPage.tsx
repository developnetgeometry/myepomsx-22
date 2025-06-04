
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { BarChartBig } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

// Sample KPI data
const kpiData = {
  totalSpend: 2345678.90,
  averageCostPerWorkOrder: 12345.67,
  maintenanceBudgetUsage: 68.5,
  costAvoidance: 456789.12,
};

const KPIDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="KPI Dashboard" 
        icon={<BarChartBig className="h-6 w-6" />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Total Spend YTD</span>
              <span className="text-2xl font-bold">{formatCurrency(kpiData.totalSpend)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Avg. Cost Per Work Order</span>
              <span className="text-2xl font-bold">{formatCurrency(kpiData.averageCostPerWorkOrder)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Maintenance Budget Usage</span>
              <span className="text-2xl font-bold">{kpiData.maintenanceBudgetUsage}%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Cost Avoidance</span>
              <span className="text-2xl font-bold">{formatCurrency(kpiData.costAvoidance)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-medium mb-4">Performance Metrics</h2>
          <p className="text-gray-500">KPI dashboard with charts and metrics will be displayed here, using Malaysian Ringgit (RM) formatting for all monetary values.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPIDashboardPage;
