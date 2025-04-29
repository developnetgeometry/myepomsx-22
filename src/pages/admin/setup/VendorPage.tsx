
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
const initialVendors = [
  {
    id: '1',
    vendorCode: 'V001',
    vendorName: 'Industrial Supplies Inc.',
    contactPerson: 'David Miller',
    email: 'david@industrialsupplies.com',
    phone: '123-456-7890',
    address: '123 Industry Ave, Houston, TX 77001',
    category: 'Equipment',
    status: 'Active',
  },
  {
    id: '2',
    vendorCode: 'V002',
    vendorName: 'MechTech Solutions',
    contactPerson: 'Jessica Brown',
    email: 'jessica@mechtech.com',
    phone: '987-654-3210',
    address: '456 Engineering Blvd, Austin, TX 78701',
    category: 'Services',
    status: 'Active',
  },
  {
    id: '3',
    vendorCode: 'V003',
    vendorName: 'Electrical Components Ltd.',
    contactPerson: 'Mark Wilson',
    email: 'mark@electricalcomponents.com',
    phone: '555-123-4567',
    address: '789 Electric Way, Dallas, TX 75201',
    category: 'Parts',
    status: 'Inactive',
  },
  {
    id: '4',
    vendorCode: 'V004',
    vendorName: 'Precision Tools Corp',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@precisiontools.com',
    phone: '222-333-4444',
    address: '101 Tool St, San Antonio, TX 78205',
    category: 'Equipment',
    status: 'Active',
  },
  {
    id: '5',
    vendorCode: 'V005',
    vendorName: 'Maintenance Pros',
    contactPerson: 'Michael Chen',
    email: 'michael@maintenancepros.com',
    phone: '444-555-6666',
    address: '202 Service Rd, Phoenix, AZ 85001',
    category: 'Services',
    status: 'Active',
  },
];

const VendorPage: React.FC = () => {
  const [vendors, setVendors] = useState(initialVendors);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    vendorCode: '',
    vendorName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    category: '',
    status: 'Active',
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${vendors.length + 1}`,
      vendorCode: `V${String(vendors.length + 1).padStart(3, '0')}`,
      vendorName: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      category: '',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      setVendors(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setVendors(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { id: 'vendorCode', header: 'Vendor Code', accessorKey: 'vendorCode' },
    { id: 'vendorName', header: 'Vendor Name', accessorKey: 'vendorName' },
    { id: 'category', header: 'Category', accessorKey: 'category' },
    { id: 'contactPerson', header: 'Contact Person', accessorKey: 'contactPerson' },
    { id: 'email', header: 'Email', accessorKey: 'email' },
    { id: 'phone', header: 'Phone', accessorKey: 'phone' },
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
        title="Vendor Setup" 
        onAddNew={handleAddNew}
        addNewLabel="+ New Vendor"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={vendors}
        onEdit={handleEdit}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Vendor' : 'Add New Vendor'}
            </DialogTitle>
            <DialogDescription>
              Fill in the vendor details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vendorCode">Vendor Code</Label>
                <Input
                  id="vendorCode"
                  name="vendorCode"
                  value={formData.vendorCode}
                  onChange={handleInputChange}
                  readOnly={isEditMode}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vendorName">Vendor Name</Label>
                <Input
                  id="vendorName"
                  name="vendorName"
                  value={formData.vendorName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Parts">Parts</option>
                  <option value="Services">Services</option>
                  <option value="Consultancy">Consultancy</option>
                  <option value="Other">Other</option>
                </select>
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

export default VendorPage;
