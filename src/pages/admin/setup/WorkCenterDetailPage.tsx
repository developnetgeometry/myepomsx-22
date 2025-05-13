
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Building } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/shared/StatusBadge';
import { toast } from 'sonner';

interface WorkCenter {
  id: string;
  workCenterId: string;
  name: string;
  department: string;
  area: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: string;
}

// Sample work center data - in a real app, this would come from an API or database
const initialWorkCenters = [
  {
    id: '1',
    workCenterId: 'WC001',
    name: 'Mechanical Workshop',
    department: 'Engineering',
    area: 'Building A',
    contactPerson: 'John Smith',
    email: 'john.smith@example.com',
    phone: '123-456-7890',
    status: 'Active',
  },
  {
    id: '2',
    workCenterId: 'WC002',
    name: 'Electrical Lab',
    department: 'Engineering',
    area: 'Building B',
    contactPerson: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '234-567-8901',
    status: 'Active',
  },
  {
    id: '3',
    workCenterId: 'WC003',
    name: 'Control Systems',
    department: 'Operations',
    area: 'Building C',
    contactPerson: 'David Lee',
    email: 'david.lee@example.com',
    phone: '345-678-9012',
    status: 'Active',
  },
  {
    id: '4',
    workCenterId: 'WC004',
    name: 'Maintenance Shop',
    department: 'Maintenance',
    area: 'Building D',
    contactPerson: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '456-789-0123',
    status: 'Inactive',
  },
  {
    id: '5',
    workCenterId: 'WC005',
    name: 'Instrument Calibration',
    department: 'Quality Control',
    area: 'Building A',
    contactPerson: 'Robert Chen',
    email: 'robert.chen@example.com',
    phone: '567-890-1234',
    status: 'Active',
  },
];

const WorkCenterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workCenter, setWorkCenter] = useState<WorkCenter | null>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundWorkCenter = initialWorkCenters.find(wc => wc.id === id);
    
    if (foundWorkCenter) {
      setWorkCenter(foundWorkCenter);
    } else {
      toast.error("Work Center not found");
      navigate('/admin/setup/work-center');
    }
  }, [id, navigate]);
  
  if (!workCenter) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Work Center Information" 
          icon={<Building className="h-6 w-6" />}
        />
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/setup/work-center')} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Work Centers
        </Button>
      </div>
      
      <Card>
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
                <TableCell className="font-medium">Work Center ID</TableCell>
                <TableCell>{workCenter.workCenterId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Name</TableCell>
                <TableCell>{workCenter.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Department</TableCell>
                <TableCell>{workCenter.department}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Area</TableCell>
                <TableCell>{workCenter.area}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Contact Person</TableCell>
                <TableCell>{workCenter.contactPerson}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phone</TableCell>
                <TableCell>{workCenter.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Email</TableCell>
                <TableCell>{workCenter.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Status</TableCell>
                <TableCell>
                  <StatusBadge status={workCenter.status} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkCenterDetailPage;
