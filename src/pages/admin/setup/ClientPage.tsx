import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import StatusBadge from '@/components/shared/StatusBadge';

// Sample data
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

const ClientPage: React.FC = () => {
  const [clients, setClients] = useState(initialClients);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    clientCode: '',
    clientName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active',
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${clients.length + 1}`,
      clientCode: `C${String(clients.length + 1).padStart(3, '0')}`,
      clientName: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      status: 'Active',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (row: any) => {
    setIsEditMode(true);
    setFormData({
      ...row
    });
    setIsDialogOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      setClients(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setClients(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { id: 'clientCode', header: 'Client Code', accessorKey: 'clientCode' },
    { id: 'clientName', header: 'Client Name', accessorKey: 'clientName' },
    { id: 'contactPerson', header: 'Contact Person', accessorKey: 'contactPerson' },
    { id: 'email', header: 'Email', accessorKey: 'email' },
    { id: 'phone', header: 'Phone', accessorKey: 'phone' },
    { id: 'address', header: 'Address', accessorKey: 'address' },
    { 
      id: 'status', 
      header: 'Status', 
      accessorKey: 'status',
      cell: (value) => <StatusBadge status={value} />
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Client Setup" 
        onAddNew={handleAddNew}
        addNewLabel="+ New Client"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={clients}
        onEdit={handleEdit}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Client' : 'Add New Client'}
            </DialogTitle>
            <DialogDescription>
              Fill in the client details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientCode">Client Code</Label>
                <Input
                  id="clientCode"
                  name="clientCode"
                  value={formData.clientCode}
                  onChange={handleInputChange}
                  readOnly={isEditMode}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientPage;
