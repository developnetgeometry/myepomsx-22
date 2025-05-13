
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Wrench } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/shared/StatusBadge';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const MaintenanceTypeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real application, this would fetch data from an API
  const maintenanceType = {
    id,
    typeId: `MT${String(id).padStart(3, '0')}`,
    maintenanceType: 'Preventive Maintenance',
    applicableScope: 'All Equipment',
    description: 'Scheduled maintenance activities to prevent equipment failure',
    status: 'Active'
  };
  
  return (
    <div className="space-y-6">
      <Breadcrumbs />
      
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Maintenance Type Details" 
          icon={<Wrench className="h-6 w-6" />}
        />
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/settings/maintenance-type')} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Maintenance Types
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Type #{id}</CardTitle>
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
                <TableCell className="font-medium">Type ID</TableCell>
                <TableCell>{maintenanceType.typeId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Maintenance Type</TableCell>
                <TableCell>{maintenanceType.maintenanceType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Applicable Scope</TableCell>
                <TableCell>{maintenanceType.applicableScope}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Description</TableCell>
                <TableCell>{maintenanceType.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Status</TableCell>
                <TableCell>
                  <StatusBadge status={maintenanceType.status} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceTypeDetailPage;
