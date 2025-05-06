
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Database } from 'lucide-react';

const AssetTagDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Asset Tag Detail" 
          icon={<Database className="h-6 w-6" />}
        />
        <Button variant="outline" onClick={() => navigate('/admin/settings/asset-tag')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Asset Tags
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Asset Tag #{id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Tag Code</h3>
              <p className="text-base">Tag code would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p className="text-base">Description would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">System</h3>
              <p className="text-base">System would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <p className="text-base">Status would appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetTagDetailPage;
