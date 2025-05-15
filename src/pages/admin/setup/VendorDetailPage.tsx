
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Store } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/shared/StatusBadge';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Vendor {
  id: string;
  vendorCode: string;
  vendorName: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: string;
}

// Sample vendor data
const initialVendors = [
  {
    id: '1',
    vendorCode: 'V001',
    vendorName: 'ABC Equipment Suppliers',
    category: 'Equipment',
    contactPerson: 'James Wilson',
    email: 'james@abcequipment.com',
    phone: '123-456-7890',
    status: 'Active',
  },
  {
    id: '2',
    vendorCode: 'V002',
    vendorName: 'XYZ Maintenance Services',
    category: 'Services',
    contactPerson: 'Linda Martinez',
    email: 'linda@xyzmaintenance.com',
    phone: '987-654-3210',
    status: 'Active',
  },
  {
    id: '3',
    vendorCode: 'V003',
    vendorName: 'Delta Parts Inc.',
    category: 'Parts',
    contactPerson: 'Robert Taylor',
    email: 'robert@deltaparts.com',
    phone: '555-123-4567',
    status: 'Inactive',
  },
  {
    id: '4',
    vendorCode: 'V004',
    vendorName: 'Omega Technical Services',
    category: 'Services',
    contactPerson: 'Susan Brown',
    email: 'susan@omegatech.com',
    phone: '222-333-4444',
    status: 'Active',
  },
  {
    id: '5',
    vendorCode: 'V005',
    vendorName: 'Global Equipment Corp',
    category: 'Equipment',
    contactPerson: 'Mark Johnson',
    email: 'mark@globalequipment.com',
    phone: '444-555-6666',
    status: 'Active',
  },
];

const getCategoryBadge = (category: string) => {
  switch(category.toLowerCase()) {
    case 'equipment':
      return <Badge variant="outline-info">{category}</Badge>;
    case 'services':
      return <Badge variant="outline-success">{category}</Badge>;
    case 'parts':
      return <Badge variant="outline-amber">{category}</Badge>;
    default:
      return <Badge variant="outline">{category}</Badge>;
  }
};

const VendorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundVendor = initialVendors.find(v => v.id === id);
    
    if (foundVendor) {
      setVendor(foundVendor);
    } else {
      toast.error("Vendor not found");
      navigate('/admin/setup/vendor');
    }
  }, [id, navigate]);
  
  if (!vendor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Vendor Info" 
          icon={<Store className="h-6 w-6" />}
        />
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/setup/vendor')} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Vendors
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
                <TableCell className="font-medium">Vendor Code</TableCell>
                <TableCell>{vendor.vendorCode}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Vendor Name</TableCell>
                <TableCell>{vendor.vendorName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Category</TableCell>
                <TableCell>{getCategoryBadge(vendor.category)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Contact Person</TableCell>
                <TableCell>{vendor.contactPerson}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Email</TableCell>
                <TableCell>{vendor.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phone</TableCell>
                <TableCell>{vendor.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Status</TableCell>
                <TableCell>
                  <StatusBadge status={vendor.status} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorDetailPage;
