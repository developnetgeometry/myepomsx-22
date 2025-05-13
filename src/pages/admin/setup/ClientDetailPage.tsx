
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/shared/StatusBadge';
import { toast } from 'sonner';

interface Client {
  id: string;
  clientCode: string;
  clientName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  status: string;
}

// Sample client data - in a real app, this would come from an API or database
const initialClients = [
  {
    id: '1',
    clientCode: 'C001',
    clientName: 'Acme Industries',
    contactPerson: 'John Smith',
    email: 'john@acmeindustries.com',
    phone: '123-456-7890',
    address: '123 Main St, Houston, TX 77001',
    status: 'Active',
  },
  {
    id: '2',
    clientCode: 'C002',
    clientName: 'TechSolutions Inc',
    contactPerson: 'Sarah Jones',
    email: 'sarah@techsolutions.com',
    phone: '987-654-3210',
    address: '456 Tech Blvd, Austin, TX 78701',
    status: 'Active',
  },
  {
    id: '3',
    clientCode: 'C003',
    clientName: 'Global Energy Corp',
    contactPerson: 'Michael Brown',
    email: 'mbrown@globalenergy.com',
    phone: '555-123-4567',
    address: '789 Energy Way, Dallas, TX 75201',
    status: 'Inactive',
  },
  {
    id: '4',
    clientCode: 'C004',
    clientName: 'Pacific Petroleum',
    contactPerson: 'Emily Wilson',
    email: 'emily@pacificpetro.com',
    phone: '222-333-4444',
    address: '101 Ocean Dr, San Francisco, CA 94111',
    status: 'Active',
  },
  {
    id: '5',
    clientCode: 'C005',
    clientName: 'Midwest Manufacturing',
    contactPerson: 'Robert Johnson',
    email: 'robert@midwestmfg.com',
    phone: '444-555-6666',
    address: '202 Factory Rd, Chicago, IL 60601',
    status: 'Active',
  },
];

const ClientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundClient = initialClients.find(c => c.id === id);
    
    if (foundClient) {
      setClient(foundClient);
    } else {
      toast.error("Client not found");
      navigate('/admin/setup/client');
    }
  }, [id, navigate]);
  
  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Client Details" 
          icon={<Users className="h-6 w-6" />}
        />
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/setup/client')} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Clients
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
                <TableCell className="font-medium">Client Code</TableCell>
                <TableCell>{client.clientCode}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Client Name</TableCell>
                <TableCell>{client.clientName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Contact Person</TableCell>
                <TableCell>{client.contactPerson}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Email</TableCell>
                <TableCell>{client.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phone</TableCell>
                <TableCell>{client.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Address</TableCell>
                <TableCell>{client.address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Status</TableCell>
                <TableCell>
                  <StatusBadge status={client.status} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetailPage;
