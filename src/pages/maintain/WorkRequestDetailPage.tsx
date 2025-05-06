
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';

const WorkRequestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Work Request Detail" 
        />
        <Button variant="outline" onClick={() => navigate('/maintain/work-request')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Work Requests
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Work Request #{id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Work Request No</h3>
              <p className="text-base">{id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Asset</h3>
              <p className="text-base">Asset information would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Requested By</h3>
              <p className="text-base">Requester information would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Request Date</h3>
              <p className="text-base">Date information would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Work Center</h3>
              <p className="text-base">Work center would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Work Type</h3>
              <p className="text-base">Work type would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <StatusBadge status="Pending" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Work Order No</h3>
              <p className="text-base">Related work order would appear here</p>
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">Work request description would appear here...</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkRequestDetailPage;
