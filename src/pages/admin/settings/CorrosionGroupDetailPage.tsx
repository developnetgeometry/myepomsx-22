
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/shared/StatusBadge';
import { Badge } from '@/components/ui/badge';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const CorrosionGroupDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real application, this would fetch data from an API
  const corrosionGroup = {
    id,
    groupId: `CG${String(id).padStart(3, '0')}`,
    groupName: 'General Corrosion',
    severity: 'Medium',
    description: 'Uniform loss of material across surface',
    status: 'Active'
  };
  
  const getSeverityBadge = (severity: string) => {
    switch(severity.toLowerCase()) {
      case 'high':
        return <Badge variant="warning">{severity}</Badge>;
      case 'medium':
        return <Badge variant="warning">{severity}</Badge>;
      case 'low':
        return <Badge variant="outline">{severity}</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <Breadcrumbs />
      
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Corrosion Group Details" 
          icon={<Shield className="h-6 w-6" />}
        />
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/settings/corrosion-group')} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Corrosion Groups
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Corrosion Group #{id}</CardTitle>
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
                <TableCell className="font-medium">Group ID</TableCell>
                <TableCell>{corrosionGroup.groupId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Group Name</TableCell>
                <TableCell>{corrosionGroup.groupName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Severity</TableCell>
                <TableCell>{getSeverityBadge(corrosionGroup.severity)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Description</TableCell>
                <TableCell>{corrosionGroup.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Status</TableCell>
                <TableCell>
                  <StatusBadge status={corrosionGroup.status} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CorrosionGroupDetailPage;
