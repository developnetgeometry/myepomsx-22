
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

// Sample cost data
const costData = {
  totalCost: 1234567.89,
  materialsCost: 456789.10,
  laborCost: 345678.20,
  maintenanceCost: 234567.30,
  procurementCost: 198333.29,
  previousPeriodComparison: 5.8 // percentage change 
};

const CostAnalysisPage: React.FC = () => {
  const [data] = useState(costData);
  
  const isIncrease = data.previousPeriodComparison > 0;
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Cost Analysis" 
        icon={<DollarSign className="h-6 w-6" />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Total Cost</span>
              <span className="text-2xl font-bold">{formatCurrency(data.totalCost)}</span>
              <div className="flex items-center mt-2">
                <span className={`flex items-center text-sm ${isIncrease ? 'text-red-500' : 'text-green-500'}`}>
                  {isIncrease ? (
                    <ArrowUp className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(data.previousPeriodComparison)}%
                </span>
                <span className="text-xs text-gray-500 ml-2">vs previous period</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Materials Cost</span>
              <span className="text-2xl font-bold">{formatCurrency(data.materialsCost)}</span>
              <div className="flex items-center mt-2">
                <span className="text-xs text-gray-500">37% of total cost</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Labor Cost</span>
              <span className="text-2xl font-bold">{formatCurrency(data.laborCost)}</span>
              <div className="flex items-center mt-2">
                <span className="text-xs text-gray-500">28% of total cost</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Maintenance Cost</span>
              <span className="text-2xl font-bold">{formatCurrency(data.maintenanceCost)}</span>
              <div className="flex items-center mt-2">
                <span className="text-xs text-gray-500">19% of total cost</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-medium mb-4">Cost Breakdown</h2>
          <p className="text-gray-500">Cost analysis dashboard with charts will be displayed here, showing detailed cost breakdown with Malaysian Ringgit (RM) formatting for all monetary values.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostAnalysisPage;
