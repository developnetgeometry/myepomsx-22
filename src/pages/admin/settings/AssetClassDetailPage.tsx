
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Tag } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/shared/StatusBadge';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const AssetClassDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real application, this would fetch data from an API
  const assetClass = {
    id,
    classId: `AC${String(id).padStart(3, '0')}`,
    className: 'Rotating Equipment',
    assetType: 'Mechanical',
    description: 'Classification for all rotating mechanical equipment including pumps, compressors and turbines',
    status: 'Active'
  };
  
  return (
    <div className="space-y-6">
      <Breadcrumbs />
      
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Asset Class Details" 
          icon={<Tag className="h-6 w-6" />}
        />
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/settings/asset-class')} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Asset Classes
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Asset Class #{id}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Field</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Class ID</TableCell>
                <TableCell>{assetClass.classId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Class Name</TableCell>
                <TableCell>{assetClass.className}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Asset Type</TableCell>
                <TableCell>{assetClass.assetType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Description</TableCell>
                <TableCell>{assetClass.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Status</TableCell>
                <TableCell>
                  <StatusBadge status={assetClass.status} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetClassDetailPage;
