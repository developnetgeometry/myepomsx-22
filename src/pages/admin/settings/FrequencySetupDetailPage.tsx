
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/shared/StatusBadge';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const FrequencySetupDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real application, this would fetch data from an API
  const frequency = {
    id,
    code: `FREQ${String(id).padStart(3, '0')}`,
    label: 'Quarterly',
    intervalValue: 3,
    unit: 'Months',
    status: 'Active'
  };
  
  return (
    <div className="space-y-6">
      <Breadcrumbs />
      
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Frequency Setup Details" 
          icon={<Clock className="h-6 w-6" />}
        />
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/settings/frequency-setup')} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Frequency Setup
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Frequency #{id}</CardTitle>
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
                <TableCell className="font-medium">Code</TableCell>
                <TableCell>{frequency.code}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Label</TableCell>
                <TableCell>{frequency.label}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Interval Value</TableCell>
                <TableCell>{frequency.intervalValue}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Unit</TableCell>
                <TableCell>{frequency.unit}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Status</TableCell>
                <TableCell>
                  <StatusBadge status={frequency.status} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FrequencySetupDetailPage;
