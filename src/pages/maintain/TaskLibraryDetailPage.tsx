
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const TaskLibraryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Task Detail" 
        />
        <Button variant="outline" onClick={() => navigate('/maintain/task-library')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Task Library
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Task #{id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Task ID</h3>
              <p className="text-base">{id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Task Code</h3>
              <p className="text-base">Task code would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Task Name</h3>
              <p className="text-base">Task name would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Discipline</h3>
              <p className="text-base">Discipline information would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Counter</h3>
              <p className="text-base">Counter value would appear here</p>
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Task Details</h3>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">Detailed task information would appear here...</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskLibraryDetailPage;
