
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Database } from 'lucide-react';

const DataCategoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Data Category Detail" 
          icon={<Database className="h-6 w-6" />}
        />
        <Button variant="outline" onClick={() => navigate('/admin/settings/data-category')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Data Categories
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Category #{id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Category ID</h3>
              <p className="text-base">DC{String(id).padStart(3, '0')}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
              <p className="text-base">Category name would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <p className="text-base">Status would appear here</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p className="text-base">Description would appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataCategoryDetailPage;
