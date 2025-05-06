
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Package } from 'lucide-react';

const PackageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Package Detail" 
          icon={<Package className="h-6 w-6" />}
        />
        <Button variant="outline" onClick={() => navigate('/manage/package')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Packages
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Package #{id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Package ID</h3>
              <p className="text-base">{id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Package Name</h3>
              <p className="text-base">Package name would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p className="text-base">Package description would appear here</p>
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Package Contents</h3>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">List of package contents would appear here...</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageDetailPage;
