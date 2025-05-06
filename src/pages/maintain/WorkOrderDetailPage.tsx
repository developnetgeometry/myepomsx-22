
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';

const WorkOrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Work Order Detail" 
        />
        <Button variant="outline" onClick={() => navigate('/maintain/work-order-list')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Work Orders
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Work Order #{id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Work Order No</h3>
              <p className="text-base">WO-2023-{id.padStart(4, '0')}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Plan Due Date</h3>
              <p className="text-base">Due date would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Task</h3>
              <p className="text-base">Task information would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Asset No</h3>
              <p className="text-base">Asset number would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Work Type</h3>
              <p className="text-base">Work type would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Work Center</h3>
              <p className="text-base">Work center would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <StatusBadge status="Open" />
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">Work order description would appear here...</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkOrderDetailPage;
