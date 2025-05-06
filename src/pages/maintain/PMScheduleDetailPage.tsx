
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';

const PMScheduleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="PM Schedule Detail" 
        />
        <Button variant="outline" onClick={() => navigate('/maintain/pm-schedule')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to PM Schedule
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>PM Schedule #{id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">PM Number</h3>
              <p className="text-base">PM-{id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Asset</h3>
              <p className="text-base">Asset information would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Frequency</h3>
              <p className="text-base">Frequency information would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Next Due Date</h3>
              <p className="text-base">Due date information would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <StatusBadge status="Scheduled" />
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">Detailed PM schedule description would appear here...</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PMScheduleDetailPage;
